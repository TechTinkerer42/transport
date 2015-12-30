Sample project for angular2, foundation css, Sass, Typescript, Node.js Sandbox.

To setup, run:

```
npm install
jspm install
```

and then to run server:

```
npm start
```

Then open browser to: http://localhost:8081/

---
## Apache configuration

This project is a UI only. The backend services are to be run in a java environment.

You will need to add this to your hosts file

```
127.0.0.1 transportlocal.bdpsmart.com
```

You will need to install Apache/httpd if you do not have it already. On Windows you can use XAMPP and only isntall the Apache portion.

You'll need to make sure that the following modules are installed and enabled (you should only have to enable them). To enable them remove the comment at the beginning of the line in httpd.conf

+ mod_proxy
+ mod_proxy_http
+ mod_proxy_ajp (not used currently but will be)
+ mod_rewrite

At the end of httpd.conf add the following

```
RewriteEngine On
```

If your httpd.conf references a specific vhosts file, use it. If not you can either choose to include a file that you create or just paste this into httpd.conf

```
NameVirtualHost *:80
<VirtualHost *:80>
	ServerName transportlocal.bdpsmart.com
	ServerAlias transportlocal.bdpsmart.com 
	ProxyPreserveHost On
	 <Proxy *>
	  Order deny,allow
	  Allow from all
	</Proxy>
	
	ProxyPass /transport http://localhost:8080/transport
	ProxyPassReverse /transport http://localhost:8080/transport
	
	ProxyPass / http://localhost:8081/
	ProxyPassReverse / http://localhost:8081/
</VirtualHost>
```

Restart Apache and go to 
```
http://transportlocal.bdpsmart.com
```
and you should see the first page of this app
