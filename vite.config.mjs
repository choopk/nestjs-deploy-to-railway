// import { defineConfig } from 'vite';
// import { VitePluginNode } from 'vite-plugin-node';

// export default defineConfig({
//   server: {
//     port: 5173,
//     watch: {
//       usePolling: true,
//     },
//   },
//   plugins: [
//     ...VitePluginNode({
//       adapter: 'nest',
//       appPath: './src/main.ts',
//       tsCompiler: 'swc',
//     }),
//   ],
//   //   optimizeDeps: {
//   //     exclude: ['@nestjs/microservices', '@nestjs/websockets', 'node_modules'],
//   //   },
//   resolve: {
//     alias: {
//       src: '/home/choopk/n-fundamentals-pro/src', // Adjust the path according to your project structure
//     },
//   },
// });

import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      // Nodejs native Request adapter
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
      // you can also pass a function if you are using other frameworks, see Custom Adapter section
      adapter: 'nest',

      // tell the plugin where is your project entry
      appPath: './src/main.ts',

      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: 'viteNodeApp',

      // Optional, default: false
      // if you want to init your app on boot, set this to true
      initAppOnBoot: true,

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: 'swc',

      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {},
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exlude these optional dependencies:
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
      'node_modules',
    ],
  },
  resolve: {
    alias: {
      src: '/home/choopk/n-fundamentals-pro/src', // Adjust the path according to your project structure
    },
  },
});
