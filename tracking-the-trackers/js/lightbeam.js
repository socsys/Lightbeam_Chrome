const lightbeam = {
  websites: {},
  dataGatheredSince: null,
  numFirstParties: 0,
  numThirdParties: 0,

  async init() {
    this.websites = await store.getAll();
    console.log("this websites",this.websites);
    this.initTPToggle();
    this.renderGraph();
    this.addListeners();
    this.updateVars();
  },

  async initTPToggle() {
    const toggleCheckbox
      = document.getElementById('tracking-protection-control');
    const trackingProtection = document.getElementById('tracking-protection');
    const trackingProtectionDisabled
      = document.getElementById('tracking-protection-disabled');
    // Do we support setting TP
    if ('trackingProtectionMode' in chrome.privacy.websites) {
      trackingProtection.hidden = false;
      trackingProtectionDisabled.hidden = true;

      const trackingProtectionState
        = await chrome.privacy.websites.trackingProtectionMode.get({});
      let value = true;
      if (trackingProtectionState.value !== 'always') {
        value = false;
      }
      toggleCheckbox.checked = value;
      toggleCheckbox.addEventListener('change', () => {
        const value = toggleCheckbox.checked ? 'always' : 'private_browsing';
        chrome.privacy.websites.trackingProtectionMode.set({ value });
      });
    } else {
      trackingProtection.hidden = true;
      trackingProtectionDisabled.hidden = false;
    }
  },

  renderGraph() {
    const transformedData = this.transformData();
    viz.init(transformedData.nodes, transformedData.links);
  },

  addListeners() {
    this.downloadData();
    this.downloadCookie();
	this.resetCookie();
	this.downloadCategory();
    this.resetData();
	//this.file();
	this.mailsome1();
    storeChild.onUpdate((data) => {
      this.redraw(data);
    });
  },

  // Called from init() (isFirstParty = undefined)
  // and redraw() (isFirstParty = true or false).
  async updateVars(isFirstParty) {

    // initialize dynamic vars from storage
    if (!this.dataGatheredSince) {
      const { dateStr, fullDateTime } = await this.getDataGatheredSince();
      if (!dateStr) {
        return;
      }
      this.dataGatheredSince = dateStr;
      const dataGatheredSinceElement
        = document.getElementById('data-gathered-since');
      dataGatheredSinceElement.textContent = this.dataGatheredSince || '';
      dataGatheredSinceElement.setAttribute('datetime', fullDateTime || '');
    }
    if (isFirstParty === undefined) {
      this.numFirstParties = await this.getNumFirstParties();
      this.setPartyVar('firstParty');
      this.numThirdParties = await this.getNumThirdParties();
      this.setPartyVar('thirdParty');
      return;
    }

    // update on redraw
    if (isFirstParty) {
      this.numFirstParties++;
      this.setPartyVar('firstParty');
    } else {
      this.numThirdParties++;
      this.setPartyVar('thirdParty');
    }
  },

  // Updates dynamic variable values in the page
  setPartyVar(party) {
    const numFirstPartiesElement = document.getElementById('num-first-parties');
    const numThirdPartiesElement = document.getElementById('num-third-parties');
    if (party === 'firstParty') {
      if (this.numFirstParties === 0) {
        numFirstPartiesElement.textContent = '';
      } else {
        numFirstPartiesElement.textContent = `${this.numFirstParties} Sites`;
      }
    } else if (this.numThirdParties === 0) {
      numThirdPartiesElement.textContent = '';
    } else {
      const str = `${this.numThirdParties} Third Party Sites`;
      numThirdPartiesElement.textContent = str;
    }
  },

  async getDataGatheredSince() {
    const firstRequestUnixTime = await storeChild.getFirstRequestTime();
    if (!firstRequestUnixTime) {
      return {};
    }
    // reformat unix time
    let fullDateTime = new Date(firstRequestUnixTime);
    let dateStr = fullDateTime.toDateString();
    // remove day of the week
    const dateArr = dateStr.split(' ');
    dateArr.shift();
    dateStr = dateArr.join(' ');
    // ISO string used for datetime attribute on <time>
    fullDateTime = fullDateTime.toISOString();
    return {
      dateStr,
      fullDateTime
    };
  },

  async getNumFirstParties() {
    return await storeChild.getNumFirstParties();
  },

  async getNumThirdParties() {
    return await storeChild.getNumThirdParties();
  },

  transformData() {
    const nodes = [];
    let links = [];
    for (const website in this.websites) {
      const site = this.websites[website];
      if (site.thirdParties) {
        const thirdPartyLinks = site.thirdParties.map((thirdParty) => {
          return {
            source: website,
            target: thirdParty
          };
        });
        links = links.concat(thirdPartyLinks);
      }
      nodes.push(this.websites[website]);
    }

    return {
      nodes,
      links
    };
  },
  

  downloadData()  {
    const saveData = document.getElementById('save-data-button');
    saveData.addEventListener('click', async () => {
      const data = await store.getAll();
      const blob = new Blob([JSON.stringify(data ,' ' , 2)],
        {type : 'application/json'});
      const url = window.URL.createObjectURL(blob);
      const downloading = chrome.downloads.download({
        url : url,
        filename : 'lightbeamData.json',
        conflictAction : 'uniquify'
      });
      await downloading;
    });
  },
  
  downloadCookie() {
    const saveData = document.getElementById('cookie-button');
    saveData.addEventListener('click', async () => {
	  const data = await store.getCookie();
      /*const blob = new Blob([JSON.stringify(data ,' ' , 2)],
        {type : 'application/json'});
      const url = window.URL.createObjectURL(blob);
      const downloading = chrome.downloads.download({
        url : url,
        filename : 'Cookie.json',
        conflictAction : 'uniquify'
      });
      await downloading;*/
	  var CookieData=JSON.stringify(data)
	  await alert("Cookie: \n" + CookieData + ".");
    });
  },
  
    resetCookie() {
    const saveData = document.getElementById('cookie-delete-button');
    saveData.addEventListener('click', async () => {
      //const data = await store.deleteCookie();
      const msgBegin = 'Pressing OK will delete all Cookies storage. ';
      const msgEnd = 'Are you sure?';
      const confirmation = confirm(`${msgBegin + msgEnd}`);
      if (confirmation) {
        await store.deleteCookie();
        window.location.reload();
      }
      //await downloading;
	  //var CookieData=JSON.stringify(data)
	  //await alert("Reset" + CookieData + ".");
    });
  },
  
  downloadCategory() {
    const saveData = document.getElementById('hash-button');
    saveData.addEventListener('click', async () => {
      const data = await store.countUrlCategories();
      const blob = new Blob([JSON.stringify(data ,' ' , 2)],
        {type : 'application/json'});
      const url = window.URL.createObjectURL(blob);
      const downloading = chrome.downloads.download({
        url : url,
        filename : 'Categories.json',
        conflictAction : 'uniquify'
      });
      //await downloading;
	  var categoryData=JSON.stringify(data)
	  await alert("The category count: \n" + categoryData + ".");
    });
  },

  resetData() {
    const resetData = document.getElementById('reset-data-button');
    resetData.addEventListener('click', async () => {
      const msgBegin = 'Pressing OK will delete all Lightbeam data. ';
      const msgEnd = 'Are you sure?';
      const confirmation = confirm(`${msgBegin + msgEnd}`);
      if (confirmation) {
        await storeChild.reset();
        window.location.reload();
      }
    });
  },
  
  mailsome1(){
	  const resetData = document.getElementById('mailsome-button');
    resetData.addEventListener('click', async () => {
	who=prompt("Enter developper's email address: ",":xuehui.hu@kcl.ac.uk");
	what=prompt("Enter the subject: ","none");
	if (confirm("Are you sure you want to mail "+"xuehui.hu@kcl.ac.uk"+" with the subject of "+what+"?")==true){
	window.open("mailto:xuehui.hu@kcl.ac.uk?subject=Lightbeam_"+what+"&body=Thanks for your Feedback!\b"+(new Date()));
	}});
	},

  /*
  file(){
	  const uploadBtn = document.getElementById("uploadBtn"),
        file = document.getElementById("file");
    uploadBtn.addEventListener("click", function (e) {
        if (file) {
            file.click();
        }
        e.preventDefault();
    }, false);
 
    function handlefiles(){
        const formData = new FormData($("#myForm")[0]);
		//formData.append('file', file.files[0]);
	$.ajax({

		//url: "haha/upload",
            type: "post",
			beforeSend: function(request) {
		  },
            data: formData,
	    async: false,
            cache: false,
			dataType : "application/json",
            contentType: false,
            processData: false,
            success: function(data){
                if(data.state == "1"){
                    console.log(data.msg)
		    var html = "<img οnclick='big(id)' id=img"+data.id+" src='"+data.fileAddress+"' width='200' height='200'>";
                    $("#text").val(html);
                    //此处模拟点击发送，实现选择图片之后直接发送，如果不想直接发送把下面一行注上即可
                    $("#submit").trigger("click");
                }else if(data.state == "2"){
		    console.log(data.msg)
                }else if(data.state == "3"){
                    console.log(data.msg)
                }
	    }
	});
    }
	
	
  },
  */
  
  


  redraw(data) {
    if (!(data.hostname in this.websites)) {
      this.websites[data.hostname] = data;
      this.updateVars(data.firstParty);
    }
    if (data.firstPartyHostnames) {
      // if we have the first parties make the link if they don't exist
      data.firstPartyHostnames.forEach((firstPartyHostname) => {
        if (this.websites[firstPartyHostname]) {
          const firstPartyWebsite = this.websites[firstPartyHostname];
          if (!('thirdParties' in firstPartyWebsite)) {
            firstPartyWebsite.thirdParties = [];
            firstPartyWebsite.firstParty = true;
          }
          if (!(firstPartyWebsite.thirdParties.includes(data.hostname))) {
            firstPartyWebsite.thirdParties.push(data.hostname);
          }
        }
      });
    }
    const transformedData = this.transformData(this.websites);
    viz.draw(transformedData.nodes, transformedData.links);
  }
};

window.onload = () => {
        lightbeam.init();
      };
      
