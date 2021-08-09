module.exports = {
    apps : [{
      name: "NAME_OF_BOT_HERE",
      script: 'index.js',
      args: '',
      autorestart: true,
      log_date_format: 'HH:mm:ss',
      watch: false,
      ignore_watch : [".git", "temp", "data", "node_modules"],
      max_memory_restart: '200M',
    }]
  };