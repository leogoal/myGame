class SkinConfig {
    public static getModelsConfig(skinType: E_SkinType, model: number): { [action: number]: ModelInfoConfig } {
        const modelsInfoCfg: { [action: number]: ModelInfoConfig } = cm.modelInfo[model];
        if(modelsInfoCfg) {
            return modelsInfoCfg;
        }
    }
}