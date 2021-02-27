function arrayCombine(targetArr = [], count = 1) {
  if (!Array.isArray(targetArr)) return []

  const resultArrs = []
  const flagArrs = getFlagArrs(targetArr.length, count)
  while (flagArrs.length) {
    const flagArr = flagArrs.shift()
    resultArrs.push(targetArr.filter((_, idx) => flagArr[idx]))
  }
  return resultArrs
}

function getFlagArrs(m, n = 1) {
  if (n < 1 || m < n)  return []

  let str = '1'.repeat(n) + '0'.repeat(m-n)
  let pos
  const resultArrs = [Array.from(str, x => Number(x))]
  const keyStr = '10'

  while(str.indexOf(keyStr) > -1) {
    pos = str.indexOf(keyStr)
    // 2
    str = str.replace(keyStr, '01')
    // 3
    str = Array.from(str.slice(0, pos))
      .sort((a, b) => b-a)
      .join('') + str.slice(pos)
    // 4
    resultArrs.push(Array.from(str, x => Number(x)))
  }
  return resultArrs
}


var xhrcname = new XMLHttpRequest(); 
xhrcname.open("GET","./AllSubdomains.txt",false); 
xhrcname.send(); 
var CnameCloak=(xhrcname.responseText); 
var CnameCloak=CnameCloak.split(',');

function arrSlice (arr) {
	  return arr
		.sort(() => Math.random() > .5) 
		.map((e, i) => i % 2 ? null : arr.slice(i,i+2))
		.filter(Boolean)
	}
// eslint-disable-next-line no-unused-vars
const viz = {
  scalingFactor: 2,
  circleRadius: 5,
  resizeTimer: null,
  minZoom: 0.5,
  maxZoom: 1.5,
  collisionRadius: 10,
  chargeStrength: -100,
  tickCount: 100,
  canvasColor: 'white',
  alphaStart: 1,
  alphaTargetStart: 0.1,
  alphaTargetStop: 0,

  init(nodes, links) {
    const { width, height } = this.getDimensions();
    const { canvas, context } = this.createCanvas();

    this.canvas = canvas;
    this.context = context;
    this.tooltip = document.getElementById('tooltip');
    this.circleRadius = this.circleRadius * this.scalingFactor;
    this.collisionRadius = this.collisionRadius * this.scalingFactor;
    this.scale = (window.devicePixelRatio || 1) * this.scalingFactor;
    this.transform = d3.zoomIdentity;
    this.defaultIcon = this.convertURIToImageData('images/defaultFavicon.svg');

    this.updateCanvas(width, height);
    this.draw(nodes, links);
    this.addListeners();
  },

  draw(nodes, links) {
    this.nodes = nodes;
    this.links = links;

    this.simulateForce();
    this.drawOnCanvas();
  },

  simulateForce() {
    if (!this.simulation) {
      this.simulation = d3.forceSimulation(this.nodes);
      this.simulation.on('tick', () => this.drawOnCanvas());
      this.registerSimulationForces();
    } else {
      this.simulation.nodes(this.nodes);
    }
    this.registerLinkForce();
    this.manualTick();
  },

  manualTick() {
    this.simulation.alphaTarget(this.alphaTargetStart);
    for (let i = 0; i < this.tickCount; i++) {
      this.simulation.tick();
    }
    this.stopSimulation();
  },

  restartSimulation() {
    this.simulation.alphaTarget(this.alphaTargetStart);
    this.simulation.restart();
  },

  stopSimulation() {
    this.simulation.alphaTarget(this.alphaTargetStop);
  },

  registerLinkForce() {
    const linkForce = d3.forceLink(this.links);
    linkForce.id((d) => d.hostname);
    this.simulation.force('link', linkForce);
  },

  registerSimulationForces() {
    const centerForce = d3.forceCenter(this.width / 2, this.height / 2);
    this.simulation.force('center', centerForce);

    const forceX = d3.forceX(this.width / 2);
    this.simulation.force('x', forceX);

    const forceY = d3.forceY(this.height / 2);
    this.simulation.force('y', forceY);

    const chargeForce = d3.forceManyBody();
    chargeForce.strength(this.chargeStrength);
    this.simulation.force('charge', chargeForce);

    const collisionForce = d3.forceCollide(this.collisionRadius);
    this.simulation.force('collide', collisionForce);
  },

  createCanvas() {
    const base = document.getElementById('visualization');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    base.appendChild(canvas);

    return {
      canvas,
      context
    };
  },

  updateCanvas(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.setAttribute('width', width * this.scale);
    this.canvas.setAttribute('height', height * this.scale);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.context.scale(this.scale, this.scale);
  },

  getDimensions() {
    const element = document.body;
    const { width, height } = element.getBoundingClientRect();

    return {
      width,
      height
    };
  },

  drawOnCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.translate(this.transform.x, this.transform.y);
    this.context.scale(this.transform.k, this.transform.k);
	//this.drawCookieAsync();
	this.drawCookieAsync_simple();
	this.dynamic();
    this.drawLinks();
    this.drawNodes();
    this.context.restore();
  },

  getRadius(thirdPartyLength) {
    if (thirdPartyLength > 0) {
      if (thirdPartyLength > this.collisionRadius) {
        return this.circleRadius + this.collisionRadius;
      } else {
        return this.circleRadius + thirdPartyLength;
      }
    }
    return this.circleRadius;
  },

  drawNodes() {
    for (const node of this.nodes) {
      const x = node.fx || node.x;
      const y = node.fy || node.y;
      let radius;

      this.context.beginPath();
      this.context.moveTo(x, y);

      if (node.firstParty) {
        radius = this.getRadius(node.thirdParties.length);
        this.drawFirstParty(x, y, radius*0.7);
      } else {
        this.drawThirdParty(x, y);
      }

      if (node.shadow) {
        this.drawShadow(x, y, radius*0.7);
      }
		if (CnameCloak.indexOf(node.hostname)!=-1){
			this.context.fillStyle ='red';
			
		}
		else{
		  this.context.fillStyle = this.canvasColor;
		  
		}
			this.context.closePath();
			this.context.fill();

      if (node.favicon) {
        this.drawFavicon(node, x, y);
      }
	  
    }
  },

  getSquare() {
    const side = Math.sqrt(this.circleRadius * this.circleRadius * 2);
    const offset = side * 0.5;

    return {
      side,
      offset
    };
  },

  convertURIToImageData(URI) {
    return new Promise((resolve, reject) => {
      if (!URI) {
        return reject();
      }

      const canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        side = this.getSquare().side,
        image = new Image();

	image.addEventListener('load', function() {
      canvas.width = side * this.scale;
      canvas.height = side * this.scale;
      context.fillStyle = this.canvasColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
	 }, false);



      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
		return resolve(context.getImageData(0, 0, 170, 170));
      };
      image.onerror = () => {
        return resolve(this.defaultIcon);
      };
      image.src = URI;
    });
},

  async drawFavicon(node, x, y) {
    const offset = this.getSquare().offset,
      tx = this.transform.applyX(x) - offset,
      ty = this.transform.applyY(y) - offset;

    if (!node.image) {
      node.image = await this.convertURIToImageData(node.favicon);
    }

    this.context.putImageData(node.image,
      tx * this.scale,
      ty * this.scale
    );
  },

  drawShadow(x, y, radius) {
    const lineWidth = 2,
      shadowBlur = 10,
      shadowRadius = 5;
    this.context.beginPath();
    this.context.lineWidth = lineWidth;
    this.context.shadowColor = this.canvasColor;
    this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
    this.context.shadowBlur = shadowBlur;
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
    this.context.arc(x, y, radius + shadowRadius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  },

  drawFirstParty(x, y, radius) {
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
  },

  drawThirdParty(x, y) {
    const deltaY = this.circleRadius / 2;
    const deltaX = deltaY * Math.sqrt(3);

    this.context.moveTo(x - deltaX, y + deltaY);
    this.context.lineTo(x, y - this.circleRadius);
    this.context.lineTo(x + deltaX, y + deltaY);
  },

  getTooltipPosition(x, y) {
    const tooltipArrowHeight = 20;
    const { right: canvasRight } = this.canvas.getBoundingClientRect();
    const {
      height: tooltipHeight,
      width: tooltipWidth
    } = this.tooltip.getBoundingClientRect();
    const top = y - tooltipHeight - this.circleRadius - tooltipArrowHeight;

    let left;
    if (x + tooltipWidth >= canvasRight) {
      left = x - tooltipWidth;
    } else {
      left = x - (tooltipWidth / 2);
    }

    return {
      left,
      top
    };
  },

  showTooltip(title, x, y) {
    this.tooltip.innerText = title;
    this.tooltip.style.display = 'block';

    const { left, top } = this.getTooltipPosition(x, y);
    this.tooltip.style['left'] = `${left}px`;
    this.tooltip.style['top'] = `${top}px`;
  },

  hideTooltip() {
    this.tooltip.style.display = 'none';
  },

  drawLinks() {
    this.context.beginPath();
    for (const d of this.links) {
      const sx = d.source.fx || d.source.x;
      const sy = d.source.fy || d.source.y;
      const tx = d.target.fx || d.target.x;
      const ty = d.target.fy || d.target.y;
      this.context.moveTo(sx, sy);
      this.context.lineTo(tx, ty);
    }
    this.context.closePath();
	this.context.lineWidth = 1;
    this.context.strokeStyle = '#ccc';
    this.context.stroke();
  },
  
  dynamic(){
	  this.context.beginPath();
    for (const d of this.links) {
		if (String(d.source.info)!='undefined' && String(d.target.info)!='undefined'){
				var intersection = d.source.info.filter(v => d.target.info.includes(v))
				if (intersection.length>0){
					//console.log(intersection,d.source.hostname,d.target.hostname);
					const sx = d.source.fx || d.source.x;
					const sy = d.source.fy || d.source.y;
					const tx = d.target.fx || d.target.x;
					const ty = d.target.fy || d.target.y;
					this.context.moveTo(sx, sy);
					this.context.lineTo(tx, ty);
				}
		}
    }
    this.context.closePath();
	this.context.lineWidth = 2;
    this.context.strokeStyle = 'red';
    this.context.stroke();
  },
    drawCookieAsync_simple(){
	this.context.beginPath();
	nodesarr=this.nodes;
    for (var e in nodesarr) {
		next=parseInt(e)+1;
		if (String(nodesarr[e])!='undefined' && String(nodesarr[next])!='undefined'){
			if (String(nodesarr[e].info)!='undefined' && String(nodesarr[next].info)!='undefined'){
			if (nodesarr[e].info.length>1 && nodesarr[next].info.length>1 ){
				var intersection = nodesarr[e].info.filter(v => nodesarr[next].info.includes(v))
				if (intersection.length>0){
					//console.log(intersection,nodesarr[e].hostname,nodesarr[next].hostname);
					const sx = nodesarr[e].fx || nodesarr[e].x;
					const sy = nodesarr[e].fy || nodesarr[e].y;
					const tx = nodesarr[next].fx || nodesarr[next].x;
					const ty = nodesarr[next].fy || nodesarr[next].y;
					this.context.moveTo(sx, sy);
					this.context.lineTo(tx, ty);
				}
				}
		}
		}
    }
    this.context.closePath();
	this.context.lineWidth = 1;
    this.context.strokeStyle = 'red';
    this.context.stroke();
  },

  drawCookieAsync(){
	this.context.beginPath();
	nodesarr=this.nodes;
	
	
	var nodesarr=nodesarr.filter((d)=>{
		if (String(d)!='undefined'&&(String(d.info)!='undefined'||d.cookies.length>0)&&d.firstParty==false){
			return d
			}
	});
	
	function duplicates(arr) {
    var newarr = [];
    for(var j = 0;j < arr.length;j++){
        for(var i = j+1;i < arr.length;i++){
            if(arr[j] == arr[i]){
                newarr.push(arr[i]);
                
            }
        }
    } 
    return Array.from(new Set(newarr));
	}
	var info_arr = [];
	var cookie_arr = [];

	nodesarr.forEach((node) => {
			info_arr.push(node.info);
			cookie_arr.push(Array.from(new Set(node.cookies.map(items=>items.value))))
		  });

	info_async=duplicates(info_arr.flat(2));
	info_async = info_async.filter(Boolean)
	info_async=info_async.filter(each=>(!each.startsWith('domain')) && (!each.startsWith('referer')) && (!each.startsWith('source')) && (!each.startsWith('https')) && (!each.startsWith('www.')) && (!each.startsWith('gdpr')) && (!each.startsWith('gu='))&& (!each.startsWith('r='))&& (!each.startsWith('t=')) && (!each.startsWith('lp=')))//check parameter
	info_async.forEach((a) => {
		var positions=[];
		if (String(a)!='undefined'){
			for(var i in info_arr){
				if(String(info_arr[i])!='undefined'){
					if(info_arr[i].indexOf(a)!=-1){
						positions.push(nodesarr[i])
					}
				}
			}
		}
			//console.log(positions,a)//each asynced value and matched nodes positions array for each value
			nodes_pairs=arrayCombine(positions,2)
			for (var e in nodes_pairs) {
				firstnode = nodes_pairs[e][0];
				nextnode = nodes_pairs[e][1];
					const sx = firstnode.fx || firstnode.x;
					const sy = firstnode.fy || firstnode.y;
					const tx = nextnode.fx || nextnode.x;
					const ty = nextnode.fy || nextnode.y;
					this.context.moveTo(sx, sy);
					this.context.lineTo(tx, ty);
			}
		  });
		  
	var num_reg=/^[\,\.\~\-\d]+$/;
	cookie_async=duplicates(cookie_arr.flat(2));
	cookie_async=cookie_async.filter(each=>each.length>8 && (!num_reg.test(each)) &&(!each.startsWith('http'))&&(!each.startsWith('www.')))//asynced cookie len>8 && cannot be all numeric
	
	cookie_async.forEach((a) => {
		var positions=[]
			for(var i in cookie_arr){
				if(cookie_arr[i].length>0){
					if(cookie_arr[i].indexOf(a)!=-1){
						positions.push(nodesarr[i])
						
					}
				}
			}
			//console.log(positions,a)
			nodes_pairs=arrayCombine(positions,2)
			for (var e in nodes_pairs) {
				firstnode = nodes_pairs[e][0];
				nextnode = nodes_pairs[e][1];
				//console.log(a,firstnode.hostname,nextnode.hostname);
				const sx = firstnode.fx || firstnode.x;
				const sy = firstnode.fy || firstnode.y;
				const tx = nextnode.fx || nextnode.x;
				const ty = nextnode.fy || nextnode.y;
				this.context.moveTo(sx, sy);
				this.context.lineTo(tx, ty);
			}
		  });
	
	
	
	
    this.context.closePath();
	this.context.lineWidth = 1;
    this.context.strokeStyle = 'red';
    this.context.stroke();
  },
  
  isPointInsideCircle(x, y, cx, cy) {
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);
    const d = dx * dx + dy * dy;
    const r = this.circleRadius;

    return d <= r * r;
  },

  getNodeAtCoordinates(x, y) {
    for (const node of this.nodes) {
      if (this.isPointInsideCircle(x, y, node.x, node.y)) {
        return node;
      }
    }
    return null;
  },

  getMousePosition(event) {
    const { left, top } = this.canvas.getBoundingClientRect();

    return {
      mouseX: event.clientX - left,
      mouseY: event.clientY - top
    };
  },

  addListeners() {
    this.addMouseMove();
    this.addWindowResize();
    this.addDrag();
    this.addZoom();
  },

  addMouseMove() {
    this.canvas.addEventListener('mousemove', (event) => {
      const { mouseX, mouseY } = this.getMousePosition(event);
      const [ invertX, invertY ] = this.transform.invert([mouseX, mouseY]);
      const node = this.getNodeAtCoordinates(invertX, invertY);

      if (node) {
        this.showTooltip(node.hostname, mouseX, mouseY);
      } else {
        this.hideTooltip();
      }
    });
  },

  addWindowResize() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.resize();
      }, 250);
    });
  },

  resize() {
    this.canvas.style.width = 0;
    this.canvas.style.height = 0;

    const { width, height } = this.getDimensions('visualization');
    this.updateCanvas(width, height);
    this.draw(this.nodes, this.links);
  },

  addDrag() {
    const drag = d3.drag();
    drag.subject(() => this.dragSubject());
    drag.on('start', () => this.dragStart());
    drag.on('drag', () => this.drag());
    drag.on('end', () => this.dragEnd());

    d3.select(this.canvas)
      .call(drag);
  },

  dragSubject() {
    const x = this.transform.invertX(d3.event.x);
    const y = this.transform.invertY(d3.event.y);
    return this.getNodeAtCoordinates(x, y);
  },

  dragStart() {
    if (!d3.event.active) {
      this.restartSimulation();
    }
    d3.event.subject.shadow = true;
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  },

  drag() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;

    this.hideTooltip();
  },

  dragEnd() {
    if (!d3.event.active) {
      this.stopSimulation();
    }
    d3.event.subject.x = d3.event.subject.fx;
    d3.event.subject.y = d3.event.subject.fy;
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
    d3.event.subject.shadow = false;
  },

  addZoom() {
    const zoom = d3.zoom().scaleExtent([this.minZoom, this.maxZoom]);
    zoom.on('zoom', () => this.zoom());

    d3.select(this.canvas)
      .call(zoom);
  },

  zoom() {
    this.transform = d3.event.transform;
    this.drawOnCanvas();
  }
};
