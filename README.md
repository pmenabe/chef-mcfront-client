
# Chef McFront Client

Chef Mc Front Client is a PoC of a client application to simplify Chef Mc front.

With this service together with Chef Mc Front Service and the Waiter Mc Front, the developer will be able to request the construction of micro-applications from other development teams according to specific commits of the version control system of each team. These buildings will be available only to him. In this way, each developer will be able to obtain a customized development environment.

## Requirements

- [Nodejs](https://nodejs.org/) (v10 and above)

## Installation

```
$ git clone https://github.com/pmenabe/chef-mcfront-client.git
$ cd chef-mcfront-client
$ npm install
``` 

## Configuration

The configuration file is config.js and it is located in the root directory.

| Parámetro | Tipo | Default | descripción |
| :--------: | :--: | :-----: | :---------- |
|CHEF_SERVER|Object|{}|Configuration of chef service|
|CHEF_SERVER.host|String|null|Host of chef service|
|CHEF_SERVER.port|INTEGER|null|Port of chef service|
|CHEF_WEBSOCKET|Object|{}|Configuration of websocket service|
|CHEF_WEBSOCKET.host|String|null|Host of websocket service|
|CHEF_WEBSOCKET.port|INTEGER|null|Port of websocket service|
|CHEF_CLIENT|Object|{}|Configuration of chef client|
|CHEF_CLIENT.port|String|null|Port from which the client app will served|


 
## Run

In the root directory:

```
$ npm run start
$ npm run dev
```