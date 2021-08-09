import koa from "koa";
import Router from "koa-router";
import * as fs from "fs";
import * as path from "path";

const app = new koa();
const router = new Router();

router.post("/exportExcel", function (ctx, next) {
  const filePath = "./test.xlsx";
  const extname = path.extname(filePath);
  const basename = path.basename(filePath, extname);
  // console.log(extname, basename);
  const result = fs.readFileSync(filePath);
  ctx.set(
    "Content-Disposition",
    `attachment; filename=${encodeURIComponent(basename)}${extname}`,
  ); //中文名需要进行url转码
  ctx.set(
    "Content-Type",
    // xlsx 文件的类型
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  );
  ctx.response.body = result;
});

router.get("/index", function (ctx, next) {
  const filePath = "./index.html";
  const result = fs.readFileSync(filePath);
  ctx.set("Content-Type", "text/html");
  ctx.response.body = result;
});

app.use(router.routes());

app.listen(3000);

console.log("app started at port 3000...");
