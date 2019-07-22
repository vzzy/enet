REBAR = rebar3
COOKIE = enet

git:
	git status
	git add -A
	git commit -m '新增方法'	

clean:
	rm -rf _build
	rm -rf rebar.lock
	rm -rf erl_crash.dump

all: 
	$(REBAR) clean
	$(REBAR) compile
	erl -pa _build/default/lib/*/ebin -pa _build/default/lib/*/priv -name '$(COOKIE)@127.0.0.1' -setcookie $(COOKIE) -config etc/$(COOKIE).config -s $(COOKIE)

client:
	erl -pa ebin -pa _build/default/lib/*/ebin -pa _build/default/lib/*/priv
	
.PHONY:all client clean git


