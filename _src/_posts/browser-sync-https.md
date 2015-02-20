---
title: "BrowserSync HTTPS Support"
---
Things have *not* slowed since our recent [2.0 release](http://www.wearejh.com/news/browsersync-2-0/) - along with keeping on top of 
small bug fixes and refining the codebase, we have also managed to implement a much-requested feature - HTTPS proxying.

The implications of this are huge if you are developing a website locally using SSL (with self-signed certs, or the real-deal) and need access your website
through https (such as `https://wordpress.dev:8890`, for example) - as it means you can now use BrowserSync in exactly the same as everyone else can.

We've made it super-easy to use and there's no extra configuration needed - you just provide your secure address to the proxy option as you normally
would with BrowserSync. So, if you're using the command line, it's as simple as:


```bash
$ browser-sync start --proxy="https://wordpress.dev:8890"
```

... or if you configure BrowserSync through Gulp, Grunt or the API it's as simple as this:

```js
var browserSync = require("browser-sync");

browserSync({
    proxy: "https://wordpress.dev:8890"
});
```

![ss](http://cl.ly/image/2l0B3h1N1b1J/Screen%20Shot%202015-02-19%20at%2017.26.26.png)

## How does it work?

BrowserSync ships with self-signed ssl certificates. When we spot a proxy target starting with `https`, we simply boot up a 
secure server instead of the regular one, and use those self-signed certificates to verify it. This will give present you with a
warning the first time you access the URL in a browser (as they are self-signed) - but given that BrowserSync is a development tool,
this is perfectly acceptable (plus, you can provide your own certificates, should you have them).

## Full HTTPS support, across the board.

One of the key benefits of using BrowserSync, is that behind the scenes we smooth over all of the differences between use-cases. We've gone
to extreme lengths to ensure that HTTPS support works perfectly in all three modes - so whether you're serving static HTML files, proxying 
your own server, or even just copy/pasting the snippet into your code - you can benefit from this new feature.

Let's look at an example from each use-case to fully understand this new feature.
 

### Static files, https support
If your website only requires static files, simple provide `https: true` in your configuration to enable
 the secure server.

```
// Serve static files from the `./app` directory over HTTPS
browserSync({
    server: "./app",
    https: true
});
```

### Proxy https support
As example, let's say you are building a Wordpress site, and you've configured a `vhost` + `SSL` through Mamp pro.
The address you use locally to view website might be `https://wordpress.dev:8890`. To run BrowserSync against this
address, you simply provide the entire url as the proxy option.

**Note**: You don't need to provide the `https` option here, as it's inferred from the proxy target.

```
// Proxy https://wordpress.dev:8890 over HTTPS
browserSync({
    proxy: "https://wordpress.dev:8890"
});
```

### Snippet https support
A large number of BrowserSync users do not utilize the server or proxy options, and instead choose to 
copy/paste the html snippet into their website manually. Previously, if one of this websites where 
running over https, then BrowserSync snippet would simple not have worked (as the script would count as a 
**http** resource on a secure site, and would therefor be blocked by the browser).

Now in version 2.2, this is no longer a problem - all you need is the `https` option and you'll be good to go.

```
// Serve the BrowserSync script file over HTTPS
browserSync({
    https: true
});
```

### Working with the community

This feature has been the direct result of people requesting it via [twitter](https://twitter.com/browsersync) and on 
[github](https://github.com/BrowserSync). We are always open to feedback and suggestions and are happy to provide 
such features/changes that can help to improve the workflow for designers and developers. We are confident this big addition will 
be beneficial to a lot of people going forward and it's been our pleasure to work on implementing it.