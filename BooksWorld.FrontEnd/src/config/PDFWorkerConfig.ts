import { pdfjs } from "react-pdf";
import worker from "pdfjs-dist/build/pdf.worker.min?url"
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker