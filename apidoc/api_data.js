define({ "api": [
  {
    "type": "delete",
    "url": "/application/:id",
    "title": "Delete application by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "DeleteApplication",
    "group": "Applications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": "<p>Entity of updated application</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Application successfully deleted!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/apps/index.js",
    "groupTitle": "Applications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/application/:id",
    "title": "Get application by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetApplication",
    "group": "Applications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application to be retrieved</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": "<p>Entity of retrieved application</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"app\": {\n     _id,\n     user,\n     name,\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/apps/index.js",
    "groupTitle": "Applications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/applications",
    "title": "Get all applications",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetApplications",
    "group": "Applications",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "applications",
            "description": "<p>Array of objects of application entities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"applications\": [\n     {_id, user, name ...},\n     {_id, user, name ...},\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/apps/index.js",
    "groupTitle": "Applications"
  },
  {
    "type": "post",
    "url": "/applications",
    "title": "Create new application",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PostApplications",
    "group": "Applications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the new application</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": "<p>Entity of new created application</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"Application successfully added!\"\n  \"app\": {\n     _id,\n     user,\n     name,\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/apps/index.js",
    "groupTitle": "Applications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Sent data are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": { ... }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/application/:id",
    "title": "Update application by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PutApplication",
    "group": "Applications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application to be updated</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data which should be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "app",
            "description": "<p>Entity of updated application</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Application updated!\"\n  \"app\": {\n     _id,\n     user,\n     name,\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/apps/index.js",
    "groupTitle": "Applications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Sent data are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": { ... }\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/application/:appId/device/:id",
    "title": "Delete device by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "DeleteDevice",
    "group": "Devices",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":appId",
            "description": "<p>Id of application</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of device to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Device successfully deleted!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DeviceNotFound",
            "description": "<p>Device by the given id not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Device with id #123 not found!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/devices/index.js",
    "groupTitle": "Devices"
  },
  {
    "type": "get",
    "url": "/devices",
    "title": "Get all devices",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetAllDevices",
    "group": "Devices",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "devices",
            "description": "<p>Array of objects of devices entities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"devices\": [\n     {_id, app, registeredId, info, registeredAt},\n     {_id, app, registeredId, info, registeredAt},\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/devices/index.js",
    "groupTitle": "Devices"
  },
  {
    "type": "get",
    "url": "/application/:id/devices",
    "title": "Get all devices by application id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetDevices",
    "group": "Devices",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "devices",
            "description": "<p>Array of objects of devices entities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"devices\": [\n     {_id, app, registeredId, info, registeredAt},\n     {_id, app, registeredId, info, registeredAt},\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/devices/index.js",
    "groupTitle": "Devices",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/application/:id/devices",
    "title": "Add new devices by application id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PostDevices",
    "group": "Devices",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "device",
            "description": "<p>Object of device entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"Device successfully added!\",\n  \"device\": {\n      _id,\n      app,\n      registeredId,\n      info,\n      registeredAt\n  },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DeviceAlreadyExist",
            "description": "<p>Device is already registered</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"Device already registered!\"",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/devices/index.js",
    "groupTitle": "Devices"
  },
  {
    "type": "delete",
    "url": "/application/:appId/notification/:id",
    "title": "Delete notification by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "DeleteNotification",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":appId",
            "description": "<p>Id of application</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of notification to be deleted</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Notification successfully deleted!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notificationNotFound",
            "description": "<p>Notification by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Notification with id #123 not found!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/application/:appId/notification/:id",
    "title": "Get notification by id and application id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetNotification",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":appId",
            "description": "<p>Id of application</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of notification to be retrieved</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Entity of retrieved notification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"notification\": {\n     \"title\",\n     \"text\",\n     \"_id\",\n     ...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notificationNotFound",
            "description": "<p>Notification by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Notification with id #123 not found!\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/application/:id/notifications",
    "title": "Get all notifications by application id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetNotifications",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "notifications",
            "description": "<p>Array of objects of notification entities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"notifications\": [\n     {_id, title, text, datetime, ...},\n     {_id, title, text, datetime, ...},\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/summary",
    "title": "Get summary of notifications",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetSummary",
    "group": "Notifications",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "notifications",
            "description": "<p>Array of object of notification entities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"notifications\": [\n     {_id, title, text, summary}\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "post",
    "url": "/application/:id/notifications",
    "title": "Add new notification by application id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PostNotifications",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of application</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Object of notification entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"Notification successfully added!\",\n  \"notification\": {\n      _id,\n      app,\n      title,\n      text,\n      datetime,\n      ...\n  },\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Data sent are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"err\": {...}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "put",
    "url": "/application/:appId/notification/:id",
    "title": "Update notification by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PutNotification",
    "group": "Notifications",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":appId",
            "description": "<p>Id of application</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of notification to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Entity of updated notification</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Notification updated!\",\n  \"notification\": {\n     \"title\",\n     \"text\",\n     ...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Data sent are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ApplicationNotFound",
            "description": "<p>App by the given id not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "notificationNotFound",
            "description": "<p>Notification by the given id not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"err\": {...}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"No notifications found for application with id #235\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Notification with id #123 not found!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/notifications/index.js",
    "groupTitle": "Notifications"
  },
  {
    "type": "get",
    "url": "/user/:id/apiConfig",
    "title": "Get user settings",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetUserConfig",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of user for settings</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "settings",
            "description": "<p>Settings entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"settings\": {\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/logout",
    "title": "Logout current user",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "GetUsersLogout",
    "group": "Users",
    "success": {
      "fields": {
        "Reset Content 205": [
          {
            "group": "205",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 205 Reset Content\n{\n  \"message\": \"User was logged out!\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new user (registration)",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "PostUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of new user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User entity from database</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "settings",
            "description": "<p>Settings entity of user from database</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token for use on Authorization header</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"message\": \"User successfully added!!\",\n  \"user\": {\n     \"_id\", \"email\", \"isActive\", \"createdAt\"\n  },\n  \"settings\": {\n     \"fcmToken\"\n  },\n  \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExist",
            "description": "<p>User with email already exist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"message\": \"User already exist!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/forgottenPassword",
    "title": "Send new password to given email",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "PostUsersFP",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of forgotten password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Password successfully renewed! Check your email.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login user and get identity",
    "permission": [
      {
        "name": "none"
      }
    ],
    "name": "PostUsersLogin",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User entity</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Access token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User successfulyl logged in!\",\n  \"user\": {\n     ...\n  },\n  token: \"supersecretToken\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadCredentials",
            "description": "<p>Bad credentials</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Bad credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Update user by id",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PutUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of user to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message about result</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User was updated!\",\n  \"user\": {\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Data sent are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"err\": {...}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/user/:id/apiConfig",
    "title": "Update user settings",
    "permission": [
      {
        "name": "logged",
        "title": "Logged user access only",
        "description": "<p>Only logged user can access to this endpoint.</p>"
      }
    ],
    "name": "PutUserConfig",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":id",
            "description": "<p>Id of user for find settings to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "settings",
            "description": "<p>Settings entity</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"settings\": {\n     ...\n  },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidData",
            "description": "<p>Data sent are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"err\": {...}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/actions/users/index.js",
    "groupTitle": "Users"
  }
] });
