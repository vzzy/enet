enet
=====

An Erlang Net library for Rest API,Websocket and TCP.

Data : json

Reuqire
-------
	otp17.5+
	GNU Make
	rebar3
	
	{enet,[
	    {interface,enet_tcp_interface},   %% 接口模块 
	    {ports,[8080]},               %% TCP端口列表
	    
	    {http_port,80},
	    {http_num_acceptors, 1000},
	    {web_root,"priv/web"}
	 ]}
	 
	 web_root 用绝对路径比较合适，相对路径容易搞混

Build
-----
	# make clean
	# make all        

	# curl http://127.0.0.1:8080/api/nodes

	需写自己的ws_handler、hanlder模块。

	handler(Args,<<"GET">>,Heads,Bindings,Bodys)
	handler(Args,<<"POST">>,Heads,Bindings,Bodys)
	
	log(debug | info | warning | error,Maps)
