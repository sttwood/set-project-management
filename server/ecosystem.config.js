module.exports = {
  apps: [
    {
      name: "stt-project-management",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      }
    }
  ]
}