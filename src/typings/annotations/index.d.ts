interface IFilterTaskTypeSelection {
  text: AnnotationTypesNonStrictType;
  value: AnnotationTypesNonStrictType;
  value_strict: AnnotationTypesStrictType;
  disable: boolean;
  availableTo: string[];
  hide?: boolean;
  automatic_prelabel?: boolean;
  without_suggest_images?: boolean;
  soon?: boolean;
}

type AnnotationTypesNonStrictType =
  | 'Annotation Box'
  | 'Annotation Line'
  | 'Annotation Cuboid'
  | 'Annotation Video'
  | 'Annotation Polygon'
  | 'Annotation Point'
  | 'Image Categorization'
  | 'Point Cloud Segmentation'
  | 'Segmentation';

type AnnotationTypesStrictType =
  | 'annotation-box'
  | 'annotation-line'
  | 'annotation-polygon'
  | 'annotation-point'
  | 'annotation-cuboid'
  | 'annotation-video'
  | 'segmentation'
  | 'annotation-pcd'
  | 'categorization-image'

type AnnotationTypesShortType =
  | 'box'
  | 'line'
  | 'polygon'
  | 'point'
  | 'cuboid'
  | 'video'
  | 'segmentation'
  | 'pcd'
  | 'image'

interface IObjectToAnnotate {
  label: string;
  color: string;
}

type AnnotationsResultFormatsType =
  | 'yolo'
  | 'coco'
  | 'pascal_voc'
  | 'default'
  | '';

interface IFormatSelection {
  text: string;
  type: AnnotationsResultFormatsType;
}

interface IAnnotationUpdate {
  _id: string;
  instructions?: string;
  objects_to_annotate?: IObjectToAnnotate[];
  categories?: any;
  type?: any;
}
