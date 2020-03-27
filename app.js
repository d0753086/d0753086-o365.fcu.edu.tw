
const render = require('./src/web/lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
//var execSync = require("child_process").execSync;
const koaStatic = require('koa-static');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = module.exports = new Koa();
var extname = path.extname;

// "database"

const posts = [];

// middleware

app.use(logger());

app.use(render);

app.use(koaBody());



// route definitions

router.get('/',main)
  .get('/introduction', introduction)
  .get('/link', link)
  .get('/share', share)
  .get('/solicitude', solicitude)
  .get('/feedback', feedback)
    
app.use(router.routes());

app.use(function *() {
  var path = __dirname + '/src/web' + this.path;
  var fstat = yield stat(path);

  if (fstat.isFile()) {
    this.type = extname(path);
    this.body = fs.createReadStream(path);
  }
});

/**
 * Post listing.
 */

async function main(ctx) {
  await ctx.render('main', {  });
}

async function feedback(ctx) {
  await ctx.render('feedback', {  });
}


async function introduction(ctx) {
  await ctx.render('introduction', {  });
}

async function link(ctx) {
  await ctx.render('link', {  });
}

async function solicitude(ctx) {
  await ctx.render('solicitude', {  });
}

async function share(ctx) {
  await ctx.render('share', {  });
}


/*async function loginx(ctx) {
  const friend = ctx.request.body;
  if (friend.email !== "eddiey23086@gmail.com",friend.password !== "123456789") ctx.throw(404, 'No found user!');
  else if(friend.email ===" ">=0 , friend.password=== " ">=0) ctx.throw(404, 'error!');
  await ctx.render('home', {  });
}*/

/**
 * Show creation form.
 */

async function add(ctx) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post: post });
}


// listen

async function execcmd(ctx) {
  console.log("Request handler 'start' was called.");
  var consolexx =  execSync("node -v");
  var str = String.fromCharCode.apply(null, consolexx);
 // var temp=  execSync("node -v", function (error, stdout, stderr) {
  //  temp = stdout;
  //  console.log('stdout:' + stdout);
  //  console.log('stderr:' + stderr);
  //  if(error!==null){
  //    console.log('exec error:' + error);
  //  }
  //});
  console.log('stdout:' + consolexx);
  var pot={ "cont": str,"name": "Node Version" };
  await ctx.render('listconsol', { post: pot });
}

if (!module.parent) app.listen(3000);

/**
 * thunkify stat
 */

function stat(file) {
  return function (done) {
    fs.stat(file, done);
  };
}