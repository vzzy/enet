enet
=====

An Erlang Net library for Rest API,Websocket and TCP.

Data : json

Reuqire
-------
	otp17.5+
	GNU Make
	rebar3

Build
-----
	# make clean
	# make all        

	# curl http://127.0.0.1:8080/api/nodes

	需写自己的ws_handler、hanlder模块。

	handler(Args,<<"GET">>,Heads,Bindings,Bodys)
	handler(Args,<<"POST">>,Heads,Bindings,Bodys)
	
	log(debug | warn | error,Maps)
