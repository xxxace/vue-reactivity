import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import serve, { RollupServeOptions } from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import livereload from 'rollup-plugin-livereload';
import { AddressInfo } from 'node:net';
import path from 'path';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';

export default {
    input: 'src/index.ts',
    output: [{
        name: 'VueReactivity',
        file: path.resolve('dist/vue.js'),
        format: 'umd',
        sourcemap: true
    }],
    plugins: [
        del({ targets: 'dist/*', runOnce: true }),
        html({
            title: 'vue-reactivity'
        }),
        alias({
            entries: [
                { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
            ]
        }),
        nodeResolve({ extensions: ['.js', '.ts'] }),
        typescript({ tsconfig: './tsconfig.json' }),
        // terser(),
        serve({
            open: false,
            port: "3060",
            contentBase: ['dist', ''],
            onListening: function (server) {
                setTimeout(() => {
                    const address = server.address() as AddressInfo
                    const host = address.address === '::' ? 'localhost' : address.address
                    // by using a bound function, we can access options as `this`
                    const protocol = (this as RollupServeOptions).https ? 'https' : 'http'
                    console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
                }, 1000)
            }
        }),
        livereload()
    ]
}