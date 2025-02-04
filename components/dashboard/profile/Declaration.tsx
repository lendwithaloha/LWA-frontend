"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateFormData, FormData } from "@/store/slice/profile/profile-setup";
import { AppDispatch } from "@/store/store";
import {
  useGetDeclarationsQuery,
  useUpdateDeclarationsMutation,
} from "@/store/slice/profile-api/profileDetail";
import { toast } from "react-toastify";
import PassportVisaUpload from "./declaration/PassportVisaUpload";
import DocumentUploadForm from "./declaration/DocumentUploadForm";
import IndexTwo from "./declaration/index-two";
import IndexThree from "./declaration/index-three";
import { CircularProgress } from "@mui/material";
import { predefinedQuestions } from "./declarationQuestions";

interface DeclarationsFormProps {
  formData?: FormData;
}

function DeclarationsForm({
  formData = {} as FormData,
}: DeclarationsFormProps, ref: React.Ref<any>
) {
  const pathname = usePathname();
  const isProfilePage = pathname === "/dashboard/profile/declaration";
  const dispatch: AppDispatch = useDispatch();

  // Fetch declaration questions dynamically
  const { data, isLoading: isFetching, refetch } = useGetDeclarationsQuery({});

  // RTK Query mutation hook for updating declarations
  const [updateDeclarations, status] = useUpdateDeclarationsMutation();

  // Extract declaration questions from the API response
  const fetchedDeclarations: { question: string; answer: boolean }[] =
    data?.borrower_declarations_questions?.length > 0
      ? data.borrower_declarations_questions : predefinedQuestions;

  // Initialize formData if not already set
  React.useEffect(() => {
    if (fetchedDeclarations.length > 0) {
      const initialFormData = fetchedDeclarations.reduce(
        (acc: any, { question, answer }: any) => ({
          ...acc,
          [question]: answer ? "yes" : "no",
        }),
        {}
      );
      Object.keys(initialFormData).forEach((key) => {
        dispatch(updateFormData({ [key]: initialFormData[key] }));
      });
    }
  }, [fetchedDeclarations, dispatch]);

  const handleInputChange = (name: string, value: string) => {
    console.log(name, value)
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }


    const declarationData = fetchedDeclarations.map(
      ({ question }: { question: string }) => ({
        question,
        answer:
          formData[question as keyof FormData] === "yes" ? "true" : "false",
      })
    );


    try {
      await updateDeclarations({
        borrower_declarations_questions: declarationData,
      }).unwrap();
      toast.success("Declarations updated successfully!");
      if (refetch) {
        await refetch();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.extra?.join(", ") ||
        error?.data?.error ||
        "Failed to update declarations!"
      );
    }
  };


  useImperativeHandle(ref, () => ({
    triggerSubmit: handleSubmit,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-4">Declarations</h2>
        {isProfilePage && (
          <p className="text-gray-600 mb-6">
            To continue using your borrower account, please review and update
            your declarations. This ensures we have the most accurate and
            up-to-date information on file.
          </p>
        )}
        {isFetching ? (
          <div className="flex flex-col justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {fetchedDeclarations.map(
              (
                { question }: { question: string; answer: boolean },
                index: number
              ) => (
                <div
                  key={question}
                  className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100"
                >
                  <div className="flex flex-col md:flex-row sm:items-center sm:justify-between">
                    <label
                      htmlFor={question}
                      className="text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-0 sm:mr-4"
                    >
                      {question}
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={question}
                          value="yes"
                          checked={(formData as any)[question] === "yes"}
                          onChange={() => handleInputChange(question, "yes")}
                          className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={question}
                          value="no"
                          checked={(formData as any)[question] === "no"}
                          onChange={() => handleInputChange(question, "no")}
                          className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>


                  {/* Conditionally render additional forms based on answers */}
                  {index === 0 && (formData as any)[question] === "no" && (
                    <div className="mt-4">
                      <PassportVisaUpload />
                    </div>
                  )}
                  {index === 1 && (formData as any)[question] === "no" && (
                    <div className="mt-4">
                      <IndexTwo />
                    </div>
                  )}
                  {index === 2 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <IndexThree />
                    </div>
                  )}
                  {index === 3 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 4 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 5 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 6 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 7 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 8 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 9 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 10 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}
                  {index === 11 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <DocumentUploadForm />
                    </div>
                  )}

                  {index === 12 && (formData as any)[question] === "yes" && (
                    <div className="mt-4">
                      <p className="text-red-500">Lend with Aloha only provides financing for non-owner occupied investment properties. Primary Residences are ineligible for financing through Lend with Aloha</p>
                    </div>
                  )}
                </div>
              )
            )}


            {isProfilePage && (
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out flex items-center"
                  disabled={status.isLoading}
                >
                  {status.isLoading ? (
                    <CircularProgress className="text-white text-sm" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default forwardRef(DeclarationsForm);


