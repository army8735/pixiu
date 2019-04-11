pixiu
====

A dom number-values collector

[![NPM version](https://badge.fury.io/js/pixiu.png)](https://npmjs.org/package/pixiu)
[![Build Status](https://travis-ci.org/army8735/pixiu.svg?branch=master)](https://travis-ci.org/army8735/pixiu)
[![Dependency Status](https://david-dm.org/army8735/pixiu.png)](https://david-dm.org/army8735/pixiu)

## INSTALL
```
npm install pixiu
```

## REQUIRE / IMPORT
```js
const pixiu = require('pixiu'); // 全部引用

const auto = require('pixiu/auto'); // 只引用自动的收集部分
const manual = require('pixiu/manual'); // 只引用手动的收集部分
```
全部引用和单独分开引用自动/手动有些许不同。
分开引用时API直接挂在相应的对象上；
全部引用自动的API挂在`auto`属性下，而手动的API挂在`manual`属性下。

## API

#### auto

```as
collect(): Array<Object>
```
收集所有仅包含唯一数字文本节点的dom节点，返回一个数组，每项是个键值对，键为编码后的selector，值为数字。

```as
observe(time: int = 500, callback: Function): void
```
侦听dom变更，`time`为回调的延迟，低于`time`的会被忽略，防止连续变更引发的频繁回调。
即便是设置为0，也不是同步触发的，因为`MutationObserver`本身异步的缘故。
`callback`的参数有2个：和上述一样的数组；以及JSON.stringify后的数组字符串。
```as
collectAndObserve(time: int, callback: Function): Array<Object>
```
收集并且侦听，相当于上述2个API的合集。
```as
disconnect(): void
```
暂停侦听。

#### manual

```as
collect(key: String = 'pixiu'): Array<Object>
```
收集所有属性包含`key`且仅包含唯一文本节点的dom节点，返回一个数组，每项是个键值对，键为属性`key`的值，值为dom的文本内容。
注意它不强制要求是数字。

```as
observe(key: String = 'pixiu', time: int = 500, callback: Function): void
```
侦听dom变更，`key`同上，`time`为回调的延迟，低于`time`的会被忽略，防止连续变更引发的频繁回调。
即便是设置为0，也不是同步触发的，因为`MutationObserver`本身异步的缘故。
`callback`的参数有2个：和上述一样的数组；以及JSON.stringify后的数组字符串。
```as
collectAndObserve(key: String = 'pixiu', time: int = 0, callback: Function): Array<Object>
```
收集并且侦听，相当于上述2个API的合集。
```as
disconnect(): void
```
暂停侦听。

#### tag
```as
encode(s: String): String
```
编码dom的nodeName为简写字符，未知则原样返回。
```as
decode(s: String): String
```
解码简写字符为dom的nodeName，未知则原样返回。
```as
decodeAll(s: String): String
```
解码整个selector并返回。

