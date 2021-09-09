# 🖥 Frontend Documentation

This documentation is the documentation for how to start, build and deploy the application. It also includes the tech stack and links to all relevant documentation and resources.

## ⚙️ Tech Stack

| library/framework | version |
| ----------------- | ------- |
| react             | 17.0.2  |
| ionic             | 5.6.5   |
| capacitor         | 3.1.2   |
| aws-amplify       | 3.3.27  |

## 📖 Resources

- [React Ionic Documentation](https://ionicframework.com/docs/react)
- [UI Components](https://ionicframework.com/docs/components)
- [Color schema generator for `theme/variables.css`](https://ionicframework.com/docs/theming/color-generator)
- [Icons](https://ionicons.com/)
- [Native Bridges Documentation](https://ionicframework.com/docs/native)
- [CLI Documentation](https://ionicframework.com/docs/cli)
- [`capacitor.config.json` Documentation](https://capacitorjs.com/docs/config)
- [Capacitor Documentation](https://capacitorjs.com/docs/basics/configuring-your-app)
- [Customize Login](https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-text-labels)
- [Customize Login](https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-text-labels)

---

# 🚀 Getting Stared

## Set up development environment

1. install all packages

```bash
npm i
```

2a. serve ionic app _**(recommended)**_

```bash
npm run serve
```

2b. serve react app

```bash
npm run start
```

# Deploying To Device Using Capacitor/CLI

```bash
npm run ionic build
npm run  ionic cap sync ios
```

After you make changes to web code, you typically run the following command.

```bash
npm run ionic cap copy ios
```

After changes to native code/plugins

```bash
npm run ionic cap sync ios
```

Open up the IDE

```bash
npm run ionic cap open ios
```

Using Live Reload To Debug Application
When developing the remainder of the application, I used live reload commands which are listed below.

```bash
npm run ionic cap run ios -l --external

npm run ionic cap run android -l --external
```
