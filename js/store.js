var url = function(){function r(r,c){var t,o={};if("tld?"===r)return n();if(c=c||window.location.toString(),!r)return c;if(r=r.toString(),t=c.match(/^mailto:([^\/].+)/))o.protocol="mailto",o.email=t[1];else{if((t=c.match(/(.*?)\/#\!(.*)/))&&(c=t[1]+t[2]),(t=c.match(/(.*?)#(.*)/))&&(o.hash=t[2],c=t[1]),o.hash&&r.match(/^#/))return e(r,o.hash);if((t=c.match(/(.*?)\?(.*)/))&&(o.query=t[2],c=t[1]),o.query&&r.match(/^\?/))return e(r,o.query);if((t=c.match(/(.*?)\:?\/\/(.*)/))&&(o.protocol=t[1].toLowerCase(),c=t[2]),(t=c.match(/(.*?)(\/.*)/))&&(o.path=t[2],c=t[1]),o.path=(o.path||"").replace(/^([^\/])/,"/$1"),r.match(/^[\-0-9]+$/)&&(r=r.replace(/^([^\/])/,"/$1")),r.match(/^\//))return a(r,o.path.substring(1));if((t=(t=a("/-1",o.path.substring(1)))&&t.match(/(.*?)\.([^.]+)$/))&&(o.file=t[0],o.filename=t[1],o.fileext=t[2]),(t=c.match(/(.*)\:([0-9]+)$/))&&(o.port=t[2],c=t[1]),(t=c.match(/(.*?)@(.*)/))&&(o.auth=t[1],c=t[2]),o.auth&&(t=o.auth.match(/(.*)\:(.*)/),o.user=t?t[1]:o.auth,o.pass=t?t[2]:void 0),o.hostname=c.toLowerCase(),"."===r.charAt(0))return a(r,o.hostname);n()&&(t=o.hostname.match(n()))&&(o.tld=t[3],o.domain=t[2]?t[2]+"."+t[3]:void 0,o.sub=t[1]||void 0),o.port=o.port||("https"===o.protocol?"443":"80"),o.protocol=o.protocol||("443"===o.port?"https":"http")}return r in o?o[r]:"{}"===r?o:void 0}function n(){return new RegExp(/(.*?)\.?([^\.]*?)\.(gl|com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/)}function a(r,c){var t=r.charAt(0),o=c.split(t);return t===r?o:o[(r=parseInt(r.substring(1),10))<0?o.length+r:r-1]}function e(r,c){for(var t,o=r.charAt(0),n=c.split("&"),a=[],e={},m=[],i=r.substring(1),s=0,h=n.length;s<h;s++)if(""!==(a=(a=n[s].match(/(.*?)=(.*)/))||[n[s],n[s],""])[1].replace(/\s/g,"")){if(a[2]=(t=a[2]||"",decodeURIComponent(t.replace(/\+/g," "))),i===a[1])return a[2];(m=a[1].match(/(.*)\[([0-9]+)\]/))?(e[m[1]]=e[m[1]]||[],e[m[1]][m[2]]=a[2]):e[a[1]]=a[2]}return o===r?e:e[i]}return r}();
//url('domain', test)


function tldurl(domain){
	if (String(url('domain',domain))!='undefined'){
		return url('domain',domain);
	}
	if (String(url('domain',domain))=='undefined'){
		return domain;
	}
}



const store = {
  ALLOWLIST_URL: '/ext-libs/disconnect-entitylist.json',
  db: null,
  db_s: null,

  async init() {
    if (!this.db) {
      this.makeNewDatabase();
    }
	if (!store.db_s) {
      store.makeSecondDatabase();
    }
    chrome.runtime.onMessage.addListener((m) => store.messageHandler(m));
    await this.getAllowList();
	
	let UUID_Store = localStorage['User_HashedID_Random'];
	if(UUID_Store){
		const UUID = localStorage['User_HashedID_Random'];
	}
	else{
		const UUID = store.generateUuid_Random();
		localStorage['User_HashedID_Random']=UUID;
	}
		
	await store.isFirstRun();

	const autoCollectSetting = document.getElementById('auto-collection-control');
	
	
	
	
	if (localStorage.getItem("auto-collection-control") === null) {
		localStorage['auto-collection-control']=autoCollectSetting.checked;
	}
	else{
		autoCollectSetting.checked =localStorage ['auto-collection-control'] == "true" ? true : false;
		autoCollectSetting.addEventListener('click', async () => {
			localStorage['auto-collection-control']=autoCollectSetting.checked;
			localStorage['consent-notice-user']=autoCollectSetting.checked;
			if (autoCollectSetting.checked==true){
				document.getElementsByClassName("modal")[0].style.display="";
				var confirm_btn=document.querySelector("body > main > div > div.modal-footer > button.modal-confirm");

					confirm_btn.addEventListener('click', async () => {
						  localStorage['consent-notice-user']=true;
						  document.getElementById('auto-collection-control').checked=true;
						  localStorage['auto-collection-control']=true;
						  document.querySelector("body > main > div ").style.display='none'
						});
						
				var cancel_btn=document.querySelector("body > main > div > div.modal-footer > button.modal-cancel");
				
					cancel_btn.addEventListener('click', async () => {
						 localStorage['consent-notice-user']=false;
						 document.querySelector("body > main > div ").style.display='none'
						 document.getElementById('auto-collection-control').checked=false;
						 localStorage['auto-collection-control']=false;
						});
				}
				
			if (autoCollectSetting.checked==false){
				const outputdata = await store.getAll();
				outputdata['__UUID']=store.transUUID();
				var CurrentDate = (new Date(new Date().getTime())).toJSON().split('T')[0];
				localStorage["Data_Collection_Date"]=CurrentDate;
				var xhr = new XMLHttpRequest(); 
			    xhr.open("POST", "https://nms.kcl.ac.uk/netsys/projects/tracking-the-trackers/cookie_LB/.receiveJSON.php", true);
			    xhr.send(JSON.stringify(outputdata,' ' , 2));
			}
		});
	}
	
  },
  
  isCollectDate(){
	  var CurrentDate = (new Date(new Date().getTime())).toJSON().split('T')[0];
		if (localStorage.getItem("Data_Collection_Date") === null) {
		  localStorage["Data_Collection_Date"]=CurrentDate;
		  return false
		}
		else {
			
			 var beginDate = localStorage["Data_Collection_Date"];  
			 var endDate = CurrentDate;  
			 var date1 = new Date(beginDate.replace(/\-/g, "\/"));  
			 var date2 = new Date(endDate.replace(/\-/g, "\/"));  
			 
			  if(beginDate!=""&&endDate!="")  
			 {
				 var diffDays = (date2 - date1) / 3600 / 1000 / 24;
				 if (diffDays > 6){
					 localStorage["Data_Collection_Date"]=CurrentDate;
					 return true
				 }
			 }
			 return false
		}
  },
  
  

  generateUuid_Random(){ 
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
},

  transUUID(){
	if(localStorage['User_HashedID_Random']){
		return localStorage['User_HashedID_Random'];
	}
	else{
		return store.generateUuid_Random();
	}
  },
 
async isFirstRun() {

	let isFirstRun = localStorage['isFirstRun'];
    if (isFirstRun==0) {
      isFirstRun = false;
    } else{
      isFirstRun = true;
	  localStorage.setItem('isFirstRun',0);
    }
    return isFirstRun;
	
  },
  indexes: [
    'hostname', // Primary key
    'isVisible',
    //'firstRequestTime',
    'firstParty'
  ],

  categories1: [
    'adults',
    'arts',
    'business',
    'computers',
    'games',
    'health',
    'homes',
    'kidsteen',
    'news',
    'recreation',
    'reference',
    'regional',
    'science',
    'shopping',
    'society',
    'sports',
    'topsites'
  ],
  categories: [
    'essential',
    'analysis',
    'advertising',
    'redirect',
    'tracking',
    'malware',
    'optimization',
    'social'
  ],
  
  indexes_s: [
    'hostname'
  ],

  makeNewDatabase() {
    this.db = new Dexie('websites_database');
    const websites = this.indexes.join(', ');
    this.db.version(1).stores({websites});
    this.db.open();
  },
  makeSecondDatabase() {
    this.db_s = new Dexie('Cookies_database');
    const CookieArray = this.indexes_s.join(', ');
    this.db_s.version(1).stores({CookieArray});
    this.db_s.open();
  },

  async getAllowList() {
    let allowList;
    try {
      allowList = await fetch(this.ALLOWLIST_URL);
      allowList = await allowList.json();
    } catch (error) {
      allowList = {};
      const explanation = 'See README.md for how to import submodule file';
      console.error(`${error.message} ${explanation} ${this.ALLOWLIST_URL}`);
    }
    const { firstPartyAllowList, thirdPartyAllowList }
      = this.reformatList(allowList);
    this.firstPartyAllowList = firstPartyAllowList;
    this.thirdPartyAllowList = thirdPartyAllowList;
  },

  reformatList(allowList) {
    const firstPartyAllowList = {};
    const thirdPartyAllowList = {};
    let counter = 0;
    for (const siteOwner in allowList) {
      const firstParties = allowList[siteOwner].properties;
	  if (String(firstParties)=='undefined'){console.log(firstParties);continue;}
      for (let i = 0; i < firstParties.length; i++) {
        firstPartyAllowList[firstParties[i]] = counter;
      }
      const thirdParties = allowList[siteOwner].resources;
      thirdPartyAllowList[counter] = [];
      for (let i = 0; i < thirdParties.length; i++) {
        thirdPartyAllowList[counter].push(thirdParties[i]);
      }
      counter++;
    }

    return {
      firstPartyAllowList,
      thirdPartyAllowList
    };
  },

  updateChild(...args) {
    return chrome.runtime.sendMessage({
      type: 'storeChildCall',
      args
    });
  },

  messageHandler(m) {
    if (m.type !== 'storeCall') {
      return;
    }

    const publicMethods = [
      'getAll',
      'reset',
      //'getFirstRequestTime',
      'getNumFirstParties',
      'getNumThirdParties',
	  'isFirstRun'
    ];

    if (publicMethods.includes(m['method'])) {
      const args = m.args;
      return this[m['method']](...args);
    } else {
      return new Error(`Unsupported method ${m.method}`);
    }
  },

  async _write(website) {
    for (const key in website) {
      website[key] = this.mungeDataInbound(key, website[key]);
    }
    return await this.db.websites.put(website);
  },

  async _writeSecond(CookieArr,CurrentUrl) {

    for (var key in CookieArr) {
      CookieArr[key] = this.mungeDataInboundSecond(key, CookieArr[key]);
    }
	CheckUrl = CookieArr.hostname;
	var ExistenceDB = await store.db_s.CookieArray.toArray();
	ExistenceDB_Arr = ExistenceDB.map(x=>Object.values(x)[0]);
	if (ExistenceDB_Arr.indexOf(CheckUrl)!= -1){
		
		var PreviousTP = ExistenceDB.filter(x=>x.hostname==CheckUrl)[0].uThirdParties;
		var NowTP = CookieArr.uThirdParties;
		ExtraTP = NowTP.filter(function(v){ return PreviousTP.indexOf(v) == -1 });
		FewerTP = PreviousTP.filter(function(v){ return NowTP.indexOf(v) == -1 });
		//console.log('previous',PreviousTP)
		//console.log('Now',NowTP)
		
		if (ExtraTP.length > 0){
			var DiffResult_e = {};
			DiffResult_e.FirstParty = CheckUrl;
			DiffResult_e.Subdomain = new URL(CurrentUrl).hostname;
			DiffResult_e.BrowsePath = new URL(CurrentUrl).pathname;
			DiffResult_e.ThirdPartyDiff = (ExtraTP);
			DiffResult_e.TimeStamp = (new Date(new Date().getTime())).toJSON();
			DiffResult_e.Cause = "ThirdParties_Decreased";
			
			
		}
		if (FewerTP.length > 0){
			var DiffResult_e = {};
			DiffResult_e.FirstParty = CheckUrl;
			DiffResult_e.Subdomain = new URL(CurrentUrl).hostname;
			DiffResult_e.BrowsePath = new URL(CurrentUrl).pathname;
			DiffResult_e.ThirdPartyDiff = (FewerTP);
			DiffResult_e.TimeStamp = (new Date(new Date().getTime())).toJSON();
			DiffResult_e.Cause = "ThirdParties_Increased";
		}
		if (Boolean(DiffResult_e)){
			//console.log(DiffResult_e);
			 if (localStorage.getItem("DiffResult_Weekly") === null) {
				  localStorage['DiffResult_Weekly']=JSON.stringify([DiffResult_e]);
			  }else{ 
					  var DiffResult_pre = JSON.parse(localStorage["DiffResult_Weekly"]);
					  DiffResult = DiffResult_pre.concat(DiffResult_e);
					  localStorage['DiffResult_Weekly']=JSON.stringify(DiffResult);
			  }

			
		}
	}
	
    return await this.db_s.CookieArray.put(CookieArr);
  },
  
  mungeDataInboundSecond(key, value) {
    if (this.indexes_s.includes(key)) {
      if (value === true) {
        value = 1;
      }
      if (value === false) {
        value = 0;
      }
    }
    return value;
  },

  outputArr(hostname, CookieArr) {
	  
    const output2 = {
      hostname: hostname,
      CookiesofBothParties: CookieArr.CookiesInTab,
	  ThirdPartiesDomain: CookieArr.uThirdParties
    };
    return output2;
	
  },
  
  async getAllCookieArray() {
    const CookieArrays = await this.db_s.CookieArray.filter((EachArray) => {
      return EachArray;
    }).toArray();
    const outputArr = {};
    for (const EachArray of CookieArrays) {
      outputArr[EachArray.hostname]
        = this.outputArr(EachArray.hostname, EachArray);	
		}
    return outputArr;

  },
  
  
  outputWebsite(hostname, website) {
	//var firstRequest = new Date(website.firstRequestTime);
	//var lastRequest = new Date(website.lastRequestTime);
    const output = {
      hostname: hostname,
      firstPartyHostnames: website.firstPartyHostnames || false,
      firstParty: !!website.firstParty,
	  cookies : new Object(),
	  info : website.info,
      thirdParties: []
	  //CollectTime: new Date(),
	  //FirstRequestTime:firstRequest.toUTCString(),
	  //LastRequestTime:lastRequest.toUTCString()
    };
	
    if ('thirdPartyHostnames' in website) {
      output.thirdParties = website.thirdPartyHostnames;
    };
	
	chrome.cookies.getAll({"url":'https://.'+tldurl(website.hostname)}, async function (cookie){
		output.cookies=cookie;
		return output;
	});
    return output;
  },
  


    async getAll() {
    const websites = await this.db.websites.filter((website) => {
      return website.isVisible || website.firstParty;
    }).toArray();
    const output = {};
    for (const website of websites) {
      output[website.hostname]
        = this.outputWebsite(website.hostname, website);	
		}
    return output;

  },



  

  async getWebsite(hostname) {
    if (!hostname) {
      throw new Error('getWebsite requires a valid hostname argument');
    }

    const website = await this.db.websites.get(hostname);
    if (website) {
      const websiteOutput = {};
      Object.keys(website).forEach((key) => {
        websiteOutput[key] = this.mungeDataOutbound(key, website[key]);
      });
      //console.log("websiteOutput",websiteOutput);
      return websiteOutput;
    } else {
      return {};
    }
  },

  mungeDataInbound(key, value) {
    if (this.indexes.includes(key)) {
      // IndexedDB does not accept boolean values for indexes; using 0/1 instead
      if (value === true) {
        value = 1;
      }
      if (value === false) {
        value = 0;
      }
    }
    return value;
  },

  mungeDataOutbound(key, value) {
    if (this.indexes.includes(key)) {
      // IndexedDB does not accept boolean values for indexes; using 0/1 instead
      if (value === 1) {
        value = true;
      }
      if (value === 0) {
        value = false;
      }
    }
    return value;
  },

  async setWebsite(hostname, data) {
    const website = await this.getWebsite(hostname);

    if (!('hostname' in website)) {
      website['hostname'] = hostname;
    }

    for (const key in data) {
      const value = data[key];
      switch (key) {
        /*case 'requestTime':
          // store first and last request times for clearing data every X days
          if (!('firstRequestTime' in website)) {
            website.firstRequestTime = value;
          } 
		break;*/
        case 'isVisible':
          if ('isVisible' in website
              && website.isVisible === true) {
            // once a website is visible, it will always be visible
            break;
          }
          website.isVisible = value;
          break;
        case 'firstParty':
          if ('firstParty' in website
              && website.firstParty === true) {
            // once a website is a first party, it will always be drawn as one
            break;
          }
          website.firstParty = value;
          if (value) {
            website.isVisible = value;
          }
          break;
        default:
          website[key] = value;
          break;
      }
    }
	

    await this._write(website);

    return website;
  },


  async isNewWebsite(hostname) {
    if (!(await this.db.websites.get(hostname))) {
      return true;
    }
    return false;
  },

  getHostnameVariants(hostname) {
    const hostnameVariants = [hostname];
    const hostnameArr = hostname.split('.');
    const numDots = hostnameArr.length - 1;
    for (let i = 0; i < numDots - 1; i++) {
      hostnameArr.shift();
      hostname = hostnameArr.join('.');
      hostnameVariants.push(hostname);
    }
    return hostnameVariants;
  },

  // check if third party is on the allowlist (owned by the first party)
  // returns true if it is and false otherwise
  onAllowList(firstPartyFromRequest, thirdPartyFromRequest) {
    if (thirdPartyFromRequest && this.firstPartyAllowList) {
      const hostnameVariantsFirstParty
        = this.getHostnameVariants(firstPartyFromRequest);
      for (let i = 0; i < hostnameVariantsFirstParty.length; i++) {
        if (this.firstPartyAllowList
          .hasOwnProperty(hostnameVariantsFirstParty[i])) {
          // first party is in the allowlist
          const index = this.firstPartyAllowList[hostnameVariantsFirstParty[i]];
          const hostnameVariantsThirdParty
            = this.getHostnameVariants(thirdPartyFromRequest);
          for (let j = 0; j < hostnameVariantsThirdParty.length; j++) {
            if (this.thirdPartyAllowList[index]
              .includes(hostnameVariantsThirdParty[j])) {
              return true;
            }
          }
          return false;
        }
      }
    }
    return false;
  },
  
  


  async setFirstParty(hostname, data) {
    if (!hostname) {
      throw new Error('setFirstParty requires a valid hostname argument');
    }

    const isNewWebsite = await this.isNewWebsite(hostname);

    const responseData = await this.setWebsite(hostname, data);

    if (isNewWebsite) {
      this.updateChild(this.outputWebsite(hostname, responseData));
    }
  },
  async setThirdParty(origin, target, data) {
    if (!origin) {
      throw new Error('setThirdParty requires a valid origin argument');
    }

    let isNewThirdParty = false;
    let shouldUpdate = false;

    const firstParty = await this.getWebsite(origin);
    const thirdParty = await this.getWebsite(target);

    // add link in third party if it doesn't exist yet
    if (!('firstPartyHostnames' in thirdParty)) {
      thirdParty['firstPartyHostnames'] = [];
    }
    if (!thirdParty['firstPartyHostnames'].includes(origin)) {
      thirdParty['firstPartyHostnames'].push(origin);
    }

    if (!this.isFirstPartyLinkedToThirdParty(firstParty, target)) {
      if (!this.isVisibleThirdParty(thirdParty)) {
        if (this.onAllowList(origin, target)) {
          // hide third party
          thirdParty['isVisible'] = false;
        } else {
          thirdParty['isVisible'] = true;
          isNewThirdParty = true;
          for (let i = 0; i < thirdParty['firstPartyHostnames'].length; i++) {
            const firstPartyHostname = thirdParty['firstPartyHostnames'][i];
            await this.addFirstPartyLink(firstPartyHostname, target);
          }
          shouldUpdate = true;
        }
      }
      if (this.isVisibleThirdParty(thirdParty) && !isNewThirdParty) {
        // an existing visible third party links to a new first party
        await this.addFirstPartyLink(origin, target);
        shouldUpdate = true;
      }
    }

    // merge data with thirdParty
    for (const key in data) {
      thirdParty[key] = data[key];
    }

    const responseData = await this.setWebsite(target, thirdParty);

    if (shouldUpdate) {
      this.updateChild(this.outputWebsite(target, responseData));
    }
  },

  isFirstPartyLinkedToThirdParty(firstParty, thirdPartyHostname) {
    if (!('thirdPartyHostnames' in firstParty)
      || !firstParty['thirdPartyHostnames'].includes(thirdPartyHostname)) {
      return false;
    }
    return true;
  },

  isVisibleThirdParty(thirdParty) {
    if (!('isVisible' in thirdParty) || !thirdParty['isVisible']) {
      return false;
    }
    return true;
  },

  async addFirstPartyLink(firstPartyHostname, thirdPartyHostname) {
    const firstParty = await this.getWebsite(firstPartyHostname);
    // We are likely storing the tp first, lets account for that
    if (!('firstParty' in firstParty)) {
      firstParty.firstParty = true;
    }
    if (!('thirdPartyHostnames' in firstParty)) {
      firstParty['thirdPartyHostnames'] = [];
    }
    if (!this.isFirstPartyLinkedToThirdParty(firstParty, thirdPartyHostname)) {
      firstParty['thirdPartyHostnames'].push(thirdPartyHostname);
      await this.setFirstParty(firstPartyHostname, firstParty);
    }
  },
  
    async getAllWithCategory() {
    const websites = await this.db.websites.filter((website) => {
      return website.isVisible || website.firstParty;
    }).toArray();
    const output = {};

  },
    async loadUrldb1(){
    this.urlcatdb1 = await fetch("/js/urlcatdb_FP.json")
    .then(function(response) {
    return response.json();
  });
  },

  async loadUrldb(){
    this.urlcatdb = await fetch("/js/urlcatdb.json")
    .then(function(response) {
    return response.json();
  });
  },

  async countUrlCategories(){
    this.loadUrldb1();
	this.loadUrldb();
    const websites = await this.getAll();
    let countCat_first = {};
    let countCat_third = {};
	let num_first = 0;
    let num_third = 0;
    for (category of this.categories1){
      countCat_first[category] = 0;
      //countCat_third[category] = 0;
    }
    for (let web in websites){
      //console.log(website);
      let website = websites[web];
      //console.log(website.hostname);
      if (website.firstParty){
        num_first += 1;
        let rootname = this.extractRootDomain(website.hostname);
        let cats = this.findCategory1(rootname);
        for (let cat in cats){
			countCat_first[cats[cat]] = countCat_first[cats[cat]]+1;		
          }
        }
      } 

    for (category of this.categories){
      //countCat_first[category] = 0;
      countCat_third[category] = 0;
    }
    for (let web in websites){
      //console.log(website);
      let website = websites[web];
      if (!website.firstParty){

		num_third += 1;
        //console.log(firstParties);

        let rn = this.extractRootDomain(website.hostname);
        let cats = this.findCategory(rn);
        for (let cat in cats){
			countCat_third[cats[cat]] = countCat_third[cats[cat]]+1;
          }
      }
    }
    return {
      countCat_first,
      countCat_third,
      num_first,
      num_third
    };
  },

  findCategory(webUrl) {
    // webUrl is a string
    const cats = this.urlcatdb[webUrl]
    return cats
  },
  
  findCategory1(webUrl) {
    // webUrl is a string
    const cats = this.urlcatdb1[webUrl]
    return cats
  },

  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  },

  extractRootDomain(url) {
    var domain = this.extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
  },

  async reset() {
    // empty out request processing queue
    capture.queue = [];
    return await this.db.websites.clear();
  },
  

  async getFirstRequestTime() {
    const oldestSite
      = await this.db.websites.orderBy('firstRequestTime').first();
    if (!oldestSite) {
      return false;
    }
    return oldestSite.firstRequestTime;
  },

  async getNumFirstParties() {
    return await this.db.websites.where('firstParty').equals(1).count();
  },

  async getNumThirdParties() {
    return await this.db.websites
      .where('firstParty').equals(0).and((website) => {
        return website.isVisible;
      }).count();
  }

};

store.init();
