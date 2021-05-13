# 🖥 Frontend Documentation

This documentation is the documentation for how to start, build and deploy the application. It also includes the tech stack and links to all relevant documentation and resources.

## ⚙️ Tech Stack

| library/framework | version |
| ----------------- | ------- |
| react             | 17.0.1  |
| ionic             | 5.5.0   |
| capacitor         | 2.4.7   |
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
yarn
```

2a. serve ionic app _**(recommended)**_

```bash
yarn serve
```

2b. serve react app

```bash
yarn start
```

# Deploying To Device Using Capacitor/CLI

```bash
yarn ionic build
yarn ionic cap sync ios
```

After you make changes to web code, you typically run the following command.

```bash
yarn ionic cap copy ios
```

After changes to native code/plugins

```bash
yarn ionic cap sync ios
```

Open up the IDE

```bash
yarn ionic cap open ios
```

Using Live Reload To Debug Application
When developing the remainder of the application, I used live reload commands which are listed below.

```bash
yarn ionic cap run ios -l --external

yarn ionic cap run android -l --external
```
