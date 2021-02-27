function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function unique(arr) {
    if (!Array.isArray(arr)) {
        return;
    }
    arr = arr.sort()
    var arrry= [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i]);
        }
    }
    return arrry;
}


function ExtractParam(url){
  if (url.indexOf("?") != -1) {
	var url = url.split("?")[1];
	Paras=url.split('&').map(item=>decodeURIComponent(item));
	return Paras;
  }
  else{
  Paras=url.split('&').map(item=>decodeURIComponent(item));
	  if (Paras.length>1){
		return Paras;
	  }
  }
}

function AllCookiesInTab(CurrentUrl){
	chrome.tabs.executeScript({
	  code: 'performance.getEntriesByType("resource").map(e => e.name)',
	}, data => {
	  if (chrome.runtime.lastError || !data || !data[0]) return;
	  var urls = data[0].map(url => url.split(/[#?]/)[0]);
	  var uniqueUrls = [...new Set(urls).values()].filter(Boolean);
	  Promise.all(
		uniqueUrls.map(url =>
		  new Promise(resolve => {
			chrome.cookies.getAll({url}, resolve);
		  })
		)
	  ).then(results => {
		var cookies = [
		  ...new Map(
			[].concat(...results)
			  .map(c => [JSON.stringify(c), c])
		  ).values()
		];

		

	var NeedStore_CookiesInTab = {};
	NeedStore_CookiesInTab["hostname"] = tldurl(CurrentUrl);
	NeedStore_CookiesInTab["CookiesInTab"] = cookies;
	NeedStore_CookiesInTab["uThirdParties"] = unique(cookies.map((x) => { 
			if (tldurl((Object.values(Object(x).valueOf('domain'))[0])).split(".")[0] != tldurl(CurrentUrl).split(".")[0]){
				return tldurl((Object.values(Object(x).valueOf('domain'))[0]))
				}
			else
			{
				return ;
			}
			})).filter(Boolean);
			
	store._writeSecond(NeedStore_CookiesInTab,CurrentUrl);  
	
	  });
	});
}
var table = [];
const capture = {

  init() {
    this.addListeners();
  },

  
  
  addListeners() {
    this.queue = [];
    chrome.webRequest.onResponseStarted.addListener((response) => {
		documentUrl = new URL(response.initiator);
		if ((documentUrl.protocol != 'about:')
		  && (documentUrl.protocol != 'chrome:')
	      && (documentUrl.protocol != 'chrome-extension:')
		  && (documentUrl.protocol != 'chrome-search:')) {

		//console.log(response.initiator);
		  const eventDetails = {
			type: 'sendThirdParty',
			data: response
		  };
		  //console.log("response",response);
		  this.queue.push(eventDetails);
		  this.processNextEvent();
		  }
    },
      {urls: ['<all_urls>']});
	
    chrome.tabs.onUpdated.addListener(

      (tabId, changeInfo, tab) => {
		  if (changeInfo.status == "complete"){
			  AllCookiesInTab(tab.url);
		  }
		  
		documentUrl = new URL(tab.url);
		if ((documentUrl.protocol != 'about:')
		  && (documentUrl.protocol != 'chrome:')
	      && (documentUrl.protocol != 'chrome-extension:')
		  && (documentUrl.protocol != 'chrome-search:')) {

			const eventDetails = {
			  type: 'sendFirstParty',
			  data: {
				tabId,
				changeInfo,
				tab
			  }
			};

			chrome.tabs.get(tabId, function(tab) {table[tabId] = tab;});
			
			this.queue.push(eventDetails);
			this.processNextEvent();
			}
      });
  },

  async processNextEvent(ignore = false) {
    if (this.processingQueue && !ignore) {
      return;
    }
    if (this.queue.length >= 1) {
      try {
        const nextEvent = this.queue.shift();
        this.processingQueue = true;
        switch (nextEvent.type) {
          case 'sendFirstParty':
            await this.sendFirstParty(
              nextEvent.data.tabId,
              nextEvent.data.changeInfo,
              nextEvent.data.tab
            );
            break;
          case 'sendThirdParty':
            await this.sendThirdParty(nextEvent.data);
            break;
          default:
            throw new Error(
              'An event must be of type sendFirstParty or sendThirdParty.'
            );
        }
      } catch (e) {
        console.warn('Exception found in queue process', e);
      }
      this.processNextEvent(true);
    } else {
      this.processingQueue = false;
    }
  },
  async shouldStore(info) {
	  
	  
    return true;
    const tabId = info.id || info.tabId;
    let documentUrl, privateBrowsing;
    const defaultCookieStore = 'chrome-default';
    if ('cookieStoreId' in info
        && info.cookieStoreId !== defaultCookieStore) {
      return false;
    }
    if (this.isVisibleTab(tabId)) {
      const tab = await this.getTab(tabId);
      if (!tab) {
        return;
      }
      if (tab.cookieStoreId !== defaultCookieStore) {
        console.log("tabcookiestoreId",tab.cookieStoreId);
        console.log("defaultCookieStore",defaultCookieStore);
        return false;
      }
      documentUrl = new URL(tab.url);
      privateBrowsing = tab.incognito;
    } else {
      if (!('cookieStoreId' in info)) {
        return false;
      }
      documentUrl = new URL(info.originUrl);
      privateBrowsing = false;
    }

    if (documentUrl.protocol !== 'about:'
      && documentUrl.protocol !== 'chrome:'
      && documentUrl.protocol !== 'chrome-search:'
      && !privateBrowsing) {
      return true;
    }
    return false;
  },

  isVisibleTab(tabId) {
    return tabId !== chrome.tabs.TAB_ID_NONE;
  },

  async getTab(tabId) {
    let tab;
    try {
      tab = await chrome.tabs.get(tabId);
    } catch (e) {
      return;
    }
    return tab;
  },

  // capture third party requests
  async sendThirdParty(response) {
    if (!response.tabId) {
      // originUrl is undefined for the first request from the chrome to the
      // first party site
      return;
    }
    const originUrl = table[response.tabId].url ? new URL(table[response.tabId].url) : '';
    const targetUrl = new URL(response.url);
    let firstPartyUrl;
    if (this.isVisibleTab(response.tabId)) {
      const tab = table[response.tabId];
      if (!tab) {
        return;
      }
      firstPartyUrl = new URL(tab.url);
    } else {
      //firstPartyUrl = new URL(response.originUrl);
      firstPartyUrl = new URL(table[response.tabId].url);
    }

    if (firstPartyUrl.hostname
      && targetUrl.hostname !== firstPartyUrl.hostname
      && await this.shouldStore(response)) {
      const data = {
        info:ExtractParam(response.url),
        target: targetUrl.hostname,
        origin: originUrl.hostname,
        requestTime: response.timeStamp,
        firstParty: false
      };

	 //console.log(parseUri(response.url).query.split('&').map(item=>decodeURIComponent(item)),ExtractParam(response.url));
      await store.setThirdParty(
        firstPartyUrl.hostname,
        targetUrl.hostname,
        data
      );
    }
  },

  // capture first party requests
  async sendFirstParty(tabId, changeInfo, tab) {
    const documentUrl = new URL(tab.url);
    if (documentUrl.hostname
        && tab.status === 'complete' && await this.shouldStore(tab)) {
      const data = {
        //faviconUrl: tab.favIconUrl,
        firstParty: true,
        requestTime: Date.now()
      };
      await store.setFirstParty(documentUrl.hostname, data);
    }
  }
};

capture.init();
