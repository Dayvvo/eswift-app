import { AxiosResponse } from "axios";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal } from "../../../components/modal";
import useProperty from "@/hooks/useProperty";
import { useImage } from "@/hooks/useInput";
import { useApiUrl } from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { DocumentTypes, R } from "@/utils/types";
import useUpload from "@/hooks/useUpload";
import { PropertyCardProps } from "../propertyCard";
import { AddPropertyScreenOne } from "./Title_Description";
import { AddPropertyScreenTwo } from "./Location_Pricing";
import { AddPropertyScreenFour } from "./Documents";
import { AddPropertyScreenThree } from "./Images";

interface User {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  avatar: any;
}

export type Documents = {
  [K in DocumentTypes]: File | null;
};

export const AddProperties = ({
  showModal,
  setShowModal,
  property,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  property?: PropertyCardProps;
}) => {
  const [loading, setLoading] = useState(false);
  const [showScreen, setShowScreen] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  const {
    title,
    description,
    state,
    lga,
    address,
    price,
    category,
    documents,
    features: existingFeatures,
    propertyType,
  } = property || { documents: [] };

  const initialDocValues = {
    FamilyReceipt: documents
      ? documents.find((doc) => doc.type === "FamilyReceipt")
      : null,
    SurveyPlan: documents
      ? documents.find((doc) => doc.type === "SurveyPlan")
      : null,
    Layout: documents ? documents.find((doc) => doc.type === "Layout") : null,
    Affidavit: documents
      ? documents.find((doc) => doc.type === "Affidavit")
      : null,
    Agreement: documents
      ? documents.find((doc) => doc.type === "Agreement")
      : null,
    CofO: documents ? documents.find((doc) => doc.type === "CofO") : null,
    PowerOfAttorney: documents
      ? documents.find((doc) => doc.type === "PowerOfAttorney")
      : null,
    GovConsent: documents
      ? documents.find((doc) => doc.type === "GovConsent")
      : null,
  };

  const initialValues = {
    title: title || "",
    description: description || "",
    state: state || "",
    lga: lga || "",
    address: address || "",
    price: price?.amount || "",
    category: category || "",
    documents: initialDocValues,
    owner: "ESWIFT",
    propertyType: propertyType || "property",
  };

  const initialTouchedValues = {
    title: false,
    description: false,
    state: false,
    lga: false,
    address: false,
    price: false,
    category: false,
    owner: false,
    propertyType: false,
  };

  const [inputs, setInput] = useState(initialValues);

  const [features, setFeatures] = useState<string[]>(existingFeatures || []);

  const [touched, setTouched] = useState(initialTouchedValues);

  const handleOnchange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnblur = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // const [documents, setDocuments] = useState<Documents>({
  //   FamilyReceipt: null,
  //   SurveyPlan: null,
  //   Layout: null,
  //   Affidavit: null,
  //   Agreement: null,
  //   CofO: null,
  //   PowerOfAttorney: null,
  //   GovConsent: null,
  // });
  useEffect(() => {
    if (property) {
      const newInitialDocs = {
        FamilyReceipt:
          property.documents?.find((doc) => doc.type === "FamilyReceipt") ||
          null,
        SurveyPlan:
          property.documents?.find((doc) => doc.type === "SurveyPlan") || null,
        Layout:
          property.documents?.find((doc) => doc.type === "Layout") || null,
        Affidavit:
          property.documents?.find((doc) => doc.type === "Affidavit") || null,
        Agreement:
          property.documents?.find((doc) => doc.type === "Agreement") || null,
        CofO: property.documents?.find((doc) => doc.type === "CofO") || null,
        PowerOfAttorney:
          property.documents?.find((doc) => doc.type === "PowerOfAttorney") ||
          null,
        GovConsent:
          property.documents?.find((doc) => doc.type === "GovConsent") || null,
      };

      setInput((prev) => ({
        ...prev,
        title: property.title || "",
        description: property.description || "",
        state: property.state || "",
        lga: property.lga || "",
        address: property.address || "",
        price: property.price?.amount || "",
        category: property.category || "",
        documents: newInitialDocs,
        propertyType: property.propertyType || "property",
      }));
    }
  }, [property]);
  const handleDocumentChange = (name: string, value: File | null) => {
    setInput((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: value,
      },
    }));
  };

  const {
    images,
    setImages,
    onChangeHandler: onChangeImage,
    error: imageError,
    deleteImage,
    reset: imageReset,
  } = useImage({ existingImages: property?.images });

  const { toast } = useToast();

  const client = useApiUrl();

  const { addProperty, editProperty } = useProperty();

  const { uploadSingle, uploadMultiple } = useUpload();

  const onChangeFeatures = () => {
    return setFeatures;
  };

  const propertyData = {
    title: inputs.title,
    lga: inputs.lga,
    state: inputs.state,
    address: inputs.address,
    price: inputs.price,
    category: inputs.category,
    description: inputs.description,
    features: features,
    owner: inputs.owner,
    images,
    documents: inputs.documents,
    propertyType: inputs.propertyType,
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const uploadPropertyFiles = async (
    images: (File | string)[],
    documents: Documents
  ) => {
    try {
      const fileImgs = images.filter(
        (img): img is File => typeof img !== "string"
      );

      let uploadedImageUrls: string[] = [];
      if (fileImgs.length > 0) {
        const imagesFormData = new FormData();
        fileImgs.forEach((img) =>
          imagesFormData.append(fileImgs.length > 1 ? "files" : "file", img)
        );

        const { data: uploadImages } =
          fileImgs.length > 1
            ? await uploadMultiple(imagesFormData)
            : await uploadSingle(imagesFormData);

        uploadedImageUrls = Array.isArray(uploadImages?.data)
          ? uploadImages.data
          : [uploadImages.data];
      }

      const existingImageUrls = images.filter(
        (img): img is string => typeof img === "string"
      );

      const finalImages = [...existingImageUrls, ...uploadedImageUrls];

      const uploadedDocuments = Object.keys(documents).filter(
        (val) => documents[val as validDocs]
      );

      let documentPayload: R[] =
        property?.documents
          ?.filter((doc) => documents[doc.type as keyof Documents])
          .map((doc) => ({ document: doc?.document, type: doc.type })) || [];

      type validDocs = keyof typeof documents;

      for (const key in uploadedDocuments) {
        let keyVal = uploadedDocuments[key];
        const matchingFile = documents[keyVal as validDocs];

        if (matchingFile instanceof File) {
          const singleFormData = new FormData();
          singleFormData.append("file", matchingFile);

          const { data: uploadImg } = await uploadSingle(singleFormData);
          if (uploadImg) {
            documentPayload.push({
              type: keyVal,
              document: uploadImg?.data,
            });
          }
        }
      }

      return {
        images: finalImages,
        documents: documentPayload,
      };
    } catch (err) {
      toast({
        status: "error",
        description: `Failed to upload files`,
        title: "Failed",
        position: "top",
        duration: 5000,
      });
    }
  };

  const addPropertyFn = async () => {
    setLoading(true);
    const { documents, price, images, ...rest } = propertyData;
    const action = property ? "update" : "create";

    try {
      const uploadedFiles = (await uploadPropertyFiles(
        images,
        documents as Documents
      )) || {
        images: [],
        documents: [],
      };

      if (!uploadedFiles) {
        toast({
          status: "error",
          description: `Failed to upload files`,
          title: "Failed",
          position: "top",
          duration: 5000,
        });
        setLoading(false);
        return;
      }

      const payload = {
        ...rest,
        price: {
          mode: "one_off",
          amount: price,
        },
        features: features,
        ...uploadedFiles,
      };
      // create endpoint

      uploadedFiles && !property && (await addProperty(payload)); // If no error occurs, the following code runs

      // update endpoint
      uploadedFiles &&
        property &&
        (await editProperty(payload, property?._id as string)); // If no error occurs, the following code runs

      setShowModal(false);
      setInput(initialValues);
      setTouched(initialTouchedValues);
      setFeatures(property?.features || []);
      setImages(property?.images || []);

      setShowScreen(1);

      toast({
        status: "success",
        description: `Property ${action}d`,
        title: "Success",
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } catch (err) {
      toast({
        status: "error",
        description: `Failed to ${action} property`,
        title: "Failed",
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ data: User[] }> = await client.get(
          `/user/users`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form>
        <Modal
          onClose={toggleModal}
          isVisible={showModal}
          label={property ? `Edit ${title} Property` : "Add Property"}
        >
          {/* {currentChildComponent} */}
          {showScreen === 1 ? (
            <AddPropertyScreenOne
              handleOnchange={handleOnchange}
              handleOnblur={handleOnblur}
              input={inputs}
              touched={touched}
              setTouched={setTouched}
              features={features}
              setFeatures={setFeatures}
              onClick={() => setShowScreen(2)}
            />
          ) : showScreen === 2 ? (
            <AddPropertyScreenTwo
              handleOnchange={handleOnchange}
              handleOnblur={handleOnblur}
              input={inputs}
              touched={touched}
              setTouched={setTouched}
              next={() => setShowScreen(3)}
              previous={() => setShowScreen(1)}
            />
          ) : showScreen === 3 ? (
            <AddPropertyScreenThree
              next={() => setShowScreen(4)}
              previous={() => setShowScreen(2)}
              images={images}
              onChangeImage={onChangeImage}
              deleteImage={deleteImage}
              error={imageError}
            />
          ) : showScreen === 4 ? (
            <AddPropertyScreenFour
              next={addPropertyFn}
              previous={() => setShowScreen(3)}
              documents={inputs.documents as Documents}
              onChangeFileName={handleDocumentChange}
              loading={loading}
            />
          ) : (
            ""
          )}
        </Modal>
      </form>
    </>
  );
};
