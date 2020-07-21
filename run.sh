#!/bin/bash -l

ps auxw | grep node | grep -v grep > /dev/null

if [ $? != 0 ]
then
	NODE_ENV=production forever start /root/pg-api/index.js > /dev/null
fi

ps auxw | grep caddy | grep -v grep > /dev/null

if [ $? != 0 ]
then
  caddy run -config /root/pg-api/Caddyfile > /dev/null
fi