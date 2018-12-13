REBAR = rebar3
COOKIE = enet

clean:
	rm -rf _build
	rm -rf rebar.lock
	rm -rf erl_crash.dump
	$(REBAR) clean

client:
	erl -pa ebin -pa _build/default/lib/*/ebin -pa _build/default/lib/*/priv
	
all: 
	$(REBAR) compile
	erl -pa _build/default/lib/*/ebin -pa _build/default/lib/*/priv -name '$(COOKIE)@127.0.0.1' -setcookie $(COOKIE) -config etc/$(COOKIE).config -s $(COOKIE)
	
.PHONY:all client clean


