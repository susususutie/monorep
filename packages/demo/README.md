# 库打包配置模板


`src/index.ts`导出所有子模块, 以供`import {} from '@sutie/demo'`使用.

根路径下的 `xx.d.ts`, `xx`指src下的各个子模块文件名, 直接通过`export * from './dist/xx'`导出子模块的打包产物, 这样是为了实现以`import {} from '@sutie/demo/xx'`方式单独引用子模块