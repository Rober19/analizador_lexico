interface IMixinsMethods {    
    /**
     * 
     * 
     */
    validateField: Function;
    resetField: Function;
    validateForm: Function;
    resetForm: Function;
    resetFormValidation: Function;
     /**
     * 
     * 
     */
    isJSON(value_to_review: any): {valid: boolean; data: any};
    imageExists: Function;
     /**
     * 
     * 
     */
    NotificationInfo: Function;
    NotificationSuccess: Function;
    NotificationWarning: Function;
    NotificationError: Function;
     /**
     * 
     * 
     */
    isMobileDevice: Function;
    getRGBA: Function;
    AnnotationTypesSelectFilter: Function;
}

interface IMixinsData extends IVeeValidateMixinsData {}
