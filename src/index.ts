import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";

import { MainAreaWidget } from "@jupyterlab/apputils";

import { ILauncher } from "@jupyterlab/launcher";

import { IPyKernelWidget } from "./widget";
/*
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const create = "create-conda-store-widget";
}

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-ksmm-extension",
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: "A way to manage IPython Kernels",
      label: "ksmm",
      icon: (args) => (args["isPalette"] ? null : null),
      execute: () => {
        const content = new IPyKernelWidget();
        const widget = new MainAreaWidget<IPyKernelWidget>({ content });
        widget.title.label = "ksmm";
        app.shell.add(widget, "main");
      },
    });

    if (launcher) {
      launcher.add({
        command,
      });
    }
  },
};

export default extension;
