import GameRunner from '../modules/game-runner/GameRunner';
import Actor from '../modules/game-runner/models/Actor';
import { LayerType } from '../modules/ui-manager/models/LayerType';
import UIManager from '../modules/ui-manager/UIManager';
import ModuleOne from './gamemodes/ModuleOne';
import Images from './Images';

export default class Game {
  private readonly uimanager: UIManager;
  private readonly runner: GameRunner;

  private readonly moduleOne: ModuleOne;

  constructor() {
    // Create app frame
    const main = document.createElement('main');
    document.body.appendChild(main);

    // Initialize UIManager
    this.uimanager = new UIManager(main);

    // Initialize GameRunner
    const runnerLayer = this.uimanager.layer(LayerType.Runner);

    // @ts-ignore Property 'ctx' does not exist on type 'Layer'. ts(2339)
    // We can safely ignore this error
    // because RunnerLayer has ctx getter
    // that doesn't exist on Layer type
    this.runner = new GameRunner(runnerLayer.ctx);
    runnerLayer!.set({ runner: this.runner });

    // Initialize modules
    this.moduleOne = new ModuleOne(this.uimanager);

    // Load images
    // this.loadImages().then(() => {
    //   // After loading all images, show module selection menu

    //   this.uimanager.layer(LayerType.Module)!.set({ onclick: this.run.bind(this) });
    //   this.uimanager.show(LayerType.Module);
    // });

    // Show editor layer
    this.uimanager.show(LayerType.Editor);
  }

  /** Loads images */
  private async loadImages(): Promise<void> {
    await Images.load();
    Actor.assets = Images.all;
  }

  /** Runs module */
  private run(module: number): void {
    switch (module) {
      case 0:
        this.moduleOne.run();
        break;
    }
  }
}