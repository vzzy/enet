// 总掐断时间 = WS_KEEPALIVE_TIME + WS_KEEPALIVE_TIME*WS_PONG_TIME.
// 暂时配置，90秒就会关闭
// WS空闲时间,超时，向客户端发起ping(毫秒) (infinity | int()>=0)
const WS_KEEPALIVE_TIME = 20*1000;
// WS超时探测间隔(毫秒) (infinity | int()>=0)
const WS_KEEPALIVE_INTVL = 10*1000;
// WS超时探测次数
const WS_KEEPALIVE_PROBES = 3;
// WS重连探测间隔
const WS_RECONN_INTVL = 20*1000;
var ws = {
	wsHost:null,
	onOpen:null,
	onClose:null,
	onMessage:null,
	onError:null,
	
	websocket:null,	
	tmping:null,
	tmreconn:null,
	probs:0
};

// 建立链路
ws.connect = function(wsHost,onOpen,onClose,onMessage,onError){
	ws.wsHost = wsHost;
	ws.onOpen = onOpen;
	ws.onClose = onClose;
	ws.onMessage = onMessage;
	ws.onError = onError;
	if(!ws.tmreconn){
    	ws.tmreconn = window.setInterval(ws.reconnect, WS_RECONN_INTVL);
    }
	ws.disconnect();
    ws.websocket = new WebSocket(wsHost);
    ws.websocket.onopen = function(evt) { 
    	ws.probs = 0;
    	ws.ping();
    	onOpen(evt); 
    }; 
    ws.websocket.onclose = function(evt) { 
    	onClose(evt); 
    	ws.disconnect();
    }; 
    ws.websocket.onmessage = function(evt) { 
    	ws.resetPingPong();
    	if(evt.data == "#ping#"){
    		ws.pong();
    	}else if(evt.data == "#pong#"){
    	}else{
    		onMessage(evt); 
    	}
    }; 
    ws.websocket.onerror = function(evt) { 
    	onError(evt);
    	ws.disconnect();
    }; 
};  

// 重连
ws.reconnect = function(){
	if(!ws.isConnect()){
		ws.connect(ws.wsHost,ws.onOpen,ws.onClose,ws.onMessage,ws.onError);
	}
}

// 断开链路
ws.disconnect = function() {
	if(ws.websocket){
		try{
			ws.websocket.close();
		    window.clearTimeout(ws.tmping); 
		    ws.websocket = null;
		}catch(e){}
	}
};

// 链路是否正常
ws.isConnect = function(){
	return ws.websocket && ws.websocket.readyState == ws.websocket.OPEN;
};

// 心跳
ws.ping = function(){
	try{
		window.clearTimeout(ws.tmping);
	}catch(e){}
	
	if(ws.probs>=WS_KEEPALIVE_PROBES){
		ws.disconnect();
	}else{
		if(ws.probs<1){
			idle = WS_KEEPALIVE_TIME;
		}else{
			idle = WS_KEEPALIVE_INTVL
		}
		ws.tmping = window.setTimeout(ws.ping, idle);
		ws.probs = ws.probs + 1;
		ws.send("#ping#");
	}
};
ws.pong = function(){
	ws.resetPingPong();
	ws.send("#pong#");
};
ws.resetPingPong = function(){
	try{
		window.clearTimeout(ws.tmping);
	}catch(e){}
	ws.probs = 0;
	ws.tmping = window.setTimeout(ws.ping, WS_KEEPALIVE_TIME);
};

// 发消息
ws.send = function(txtOrBin) {
	var flag = false;
	if(txtOrBin==null || txtOrBin==undefined || ws.trim(txtOrBin)==''){
		flag = true;
	}else if(ws.isConnect()){
        ws.websocket.send(txtOrBin);
        flag = true;
    }
    return flag;
};

ws.trim = function(str) {
	str = str.replace(/^\s\s*/, ''),
	wss = /\s/,
	i = str.length;
	while (wss.test(str.charAt(--i)));
	return str.slice(0, i + 1);
};

