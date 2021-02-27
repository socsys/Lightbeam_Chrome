const lightbeam = {
  websites: {},

  async init() {
    this.websites = await store.getAll();
	this.websitesbackup = await store.getAll();
   
	if (localStorage.getItem("consent-notice-user") === null) {
		
	document.getElementsByClassName("modal")[0].style.display="";
	var confirm_btn=document.querySelector("body > main > div > div.modal-footer > button.modal-confirm");

	    confirm_btn.addEventListener('click', async () => {
			  localStorage['consent-notice-user']=true;
			  document.getElementById('auto-collection-control').checked=true;
			  localStorage['auto-collection-control']=true;
			  document.querySelector("body > main > div ").style.display='none'
			  this.renderGraph();
			});
			
	var cancel_btn=document.querySelector("body > main > div > div.modal-footer > button.modal-cancel");
	
	    cancel_btn.addEventListener('click', async () => {
			 localStorage['consent-notice-user']=false;
			 document.querySelector("body > main > div ").style.display='none'
			 document.getElementById('auto-collection-control').checked=false;
			 localStorage['auto-collection-control']=false;
			 this.renderGraph();
			});
	}
	else{
		this.renderGraph();
		this.addListeners();
	}
	
	
	
	if (document.getElementById('auto-collection-control').checked == true) {
		if (store.isCollectDate()){
			document.getElementById('send-data-button').click();
		}
	}
	
  },

  
 

  renderGraph() {
    const transformedData = this.transformData();
    viz.init(transformedData.nodes, transformedData.links);
	
	
	
  },

  addListeners() {
    this.downloadData();
	this.sendData();
	this.downloadCategory();
    this.resetData();
	this.mailsome1();
    storeChild.onUpdate((data) => {
      this.redraw(data);
    });
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
	const outputdata = this.websitesbackup;
	function filterObj(obj, arr) {
		if (typeof (obj) !== "object" || !Array.isArray(arr)) {
			throw new Error("Wrong Format")
		}
		const result = {}
		Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
			result[key] = obj[key]
		})
		return result
	}

	require_keys = ['hostname', 'firstPartyHostnames', 'firstParty', 'thirdParties'];
	Downloaddata={};
	for (var n in outputdata) {
        ObjDown=outputdata[n];
		Downloaddata[n]=filterObj(outputdata[n],require_keys)
	}
	outputdata['__UUID']=store.transUUID();
    saveData.addEventListener('click', async () => {
		if (localStorage.getItem("DiffResult_Weekly") !== null) {
		  const DifferDetaildata = JSON.parse(localStorage["DiffResult_Weekly"]);
		var tmp = {}
		tmp['__UUID']=store.transUUID();
		DifferDetaildata.push(tmp);
			//send to server if consenting
		  localStorage.removeItem("DiffResult_Weekly"); 
	  }
	var CurrentDate = (new Date(new Date().getTime())).toJSON().split('T')[0];
	localStorage["Data_Collection_Date"]=CurrentDate;
	const blob_download = new Blob([JSON.stringify(Downloaddata,' ' , 2)], 
		{type : 'application/json'});
      const downloadurl = window.URL.createObjectURL(blob_download);
      const downloading = chrome.downloads.download({
        url : downloadurl,
        filename : 'ThunderbeamData.json',
        conflictAction : 'uniquify'
      });
      await downloading;
	  
	 document.getElementById('reset-data-button').style.backgroundColor='#194419';
	 document.getElementById('reset-data-button').innerText='Reset Data (Recommended)';
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
		
      const msgBegin = 'Pressing OK will delete all data.';
      const msgEnd = 'Are you sure?';
      const confirmation = confirm(`${msgBegin + msgEnd}`);
      if (confirmation) {
	
        await storeChild.reset();
        window.location.reload();
      }
	  
    });
  },
  
  
    sendData() {
	const outputdata = this.websitesbackup;
	outputdata['__UUID']=store.transUUID();

			  
	
    const sendData = document.getElementById('send-data-button');
	
    sendData.addEventListener('click', async () => {
	  if (localStorage.getItem("DiffResult_Weekly") !== null) {
		  const DifferDetaildata = JSON.parse(localStorage["DiffResult_Weekly"]);
			var tmp = {}
			tmp['__UUID']=store.transUUID();
			DifferDetaildata.push(tmp);
		 //send to server if consenting
		  localStorage.removeItem("DiffResult_Weekly"); 
	  }
	  var CurrentDate = (new Date(new Date().getTime())).toJSON().split('T')[0];
	  localStorage["Data_Collection_Date"]=CurrentDate;
	  
	  if ((localStorage.getItem("consent-notice-user") === null)||(localStorage['auto-collection-control']=='false')) {
		
		const msgBegin = 'This extension is developed as part of a large study of web tracking. \n * We wish to collect your data anonymously to help understand tracking around the world. If you agree, please press OK below. \n * If you press NO, then your data will NOT be collected, but you will still be able to use our extension. \n * You can change your mind at any time by simply changing the auto data collect setting on the left.';
		const msgEnd = ' ';
	  
		const confirmation = confirm(`${msgBegin + msgEnd}`);
		if (confirmation) {
			localStorage['consent-notice-user']=true;
			document.getElementById('auto-collection-control').checked=true;
			 localStorage['auto-collection-control']=true;
			//not turn to research ethics page again
				/*var n=confirm("Pressing OK to confirm you above 16 years old before sending the data.");
				if(n==true){
				  var x=prompt("If you want to know the criteria for the consent process reviewed by the Research Ethics Committee of King's College London","https://www.kcl.ac.uk/research/support/rgei/research-ethics/guidelines-for-external-researchers");
				  window.open("https://www.kcl.ac.uk/research/support/rgei/research-ethics/guidelines-for-external-researchers","_blank","top=50,left=80,width=400,height=500,scrollbar=yes,statusbar=no,menubar=no,toolbar=no"); 
				}*/
			alert("Thank you for your support !")
		  }
		else {
			 
			 document.getElementById('auto-collection-control').checked=false;
			 localStorage['auto-collection-control']=false;
			 localStorage['consent-notice-user']=false;
			 await alert("\n You have cancelled data support. \n \n If you change your mind and decide to support our data research, please use the toggle switch to opt in or back to \"Send Data\" and select \"OK\":)\n ");
		  }
	  }
	  else{
		  alert("Thank you for your support !")
	  }
    });
  },
  
  mailsome1(){
	  const resetData = document.getElementById('mailsome-button');
    resetData.addEventListener('click', async () => {
	who=prompt("Enter developper's email address: ","xuehui.hu@kcl.ac.uk");
	what=prompt("Enter the subject: ","none");
	if (confirm("Are you sure you want to mail "+"xuehui.hu@kcl.ac.uk"+" with the subject of "+what+"?")==true){
	window.open("mailto:xuehui.hu@kcl.ac.uk?subject=Lightbeam_"+what+"&body=Thanks for your Feedback!\b"+(new Date()));
	}});
	},


  redraw(data) {
    if (!(data.hostname in this.websites)) {
      this.websites[data.hostname] = data;
    }
    if (data.firstPartyHostnames) {
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
      
