interface IProject {
  _id?: string;
  name: string;
  type: AnnotationTypesStrictType;
  summary: string;
  groupid?: string;
  user_id?: string;
  instructions: string;
  objects_to_annotate: IObjectToAnnotate[] | string[];
  automatic_prelabel: boolean;
  automatic_label: boolean;
  allow_multiple?: boolean;
  isBeingTrained?: boolean;
  weightsInitialized?: boolean;
}

interface ITrainingPredictions {
  imageUrl: string;
  groundTruth: number;
  prediction: number;
}
