import { IComplex } from "@interfaces/*";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Category } from "src/app/entities/config";
import { EntityType } from "../../interfaces/entity.interface";
import { SetCurrentCategory, SetCurrentComplex } from "./entity.actions";


export interface EntityStateModel {
  currentComplex: IComplex | null;
  currentEntity: {
    category: Category;
    value: EntityType | null;
  }
}

@State<EntityStateModel>({
  name: 'entity',
  defaults: {
    currentComplex: null,
    currentEntity: {
      category: Category.complexes,
      value: null,
    }
  }
})
export class EntityState {

  @Selector()
  static getCurrentComplex(state: EntityStateModel): IComplex | null {
    return state.currentComplex;
  }

  @Selector()
  static getCurrentCategory(state: EntityStateModel): Category {
    return state.currentEntity.category;
  }

  @Action(SetCurrentComplex)
  setCurrentComplex({ getState, patchState }: StateContext<EntityStateModel>, { currentComplex }: SetCurrentComplex) {
    const currentValue = getState().currentComplex;
    if (!currentComplex || currentValue?.id === currentComplex.id) return;
    patchState({ currentComplex });
  }

  @Action(SetCurrentCategory)
  setCurrentCategory({ getState, patchState }: StateContext<EntityStateModel>, { category }: SetCurrentCategory) {
    const currentEntity = getState().currentEntity;
    if (currentEntity.category === category) return;
    patchState({
      currentEntity: {
        ...currentEntity,
        category,
      }
    });
  }
}