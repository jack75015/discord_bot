This Discord bot have two possibilities:

1) Time boxing

This BOT allows you to time box meetings. 
This can be useful to control the working time, not to waste too much time and to respect the Agile software development

How it works:
- Start a discord Client
- Watch for user message
- "Decrypt" message and see if it's a new timeBox command
- Start the timeBox

2) Presence track

Also, you can "track" users activity on your Discord servers.

How it works:
- Start a discord Client
- Watch for user presence update
- Store this presence in the database

soon:
- Save an UI where you can see user general presences


**How to use it**

TimeBoxing:


To start an event of `10` minutes (with 4 reminders): 
```
!event 10
```

To stop the event:
````
!event stop
````

**Token**

You need to have a config.ts file to the root folder:
```
export default () => ({
    BOT_TOKEN: "YOUR_BOT_TOKEN",
    ADMIN_ID: "YOUR_ADMIN_ID",
  });
```

**Start the Bot locally**

```
npm install
npm start
```
