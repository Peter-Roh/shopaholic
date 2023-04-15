import type { NextPage } from "next";
import Layout from "@/components/Layout";
import useUser from "@/libs/client/useUser";
import { api, type RouterInputs } from "@/utils/api";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Modal from "@/components/Modal";

type FormValues = RouterInputs["users"]["edit"];
type FormDelete = RouterInputs["users"]["delete"];

const ProfileEdit: NextPage = () => {
  const router = useRouter();
  const { data, refetch } = useUser();
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // edit profile

  const { mutateAsync, isLoading, isSuccess } = api.users.edit.useMutation();

  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onValid: SubmitHandler<FormValues> = async ({ id, name, avatar }) => {
    if (!isSuccess) {
      if (
        (name === undefined || (data && name === data.name)) &&
        avatar === ""
      ) {
        toast.error("Please change some data to edit your profile.");
      } else {
        await mutateAsync({ id, name, avatar }).then(async () => {
          await refetch().then(() => {
            toast.success("Profile edited successfully.");
            void router.push("/mypage");
          });
        });
      }
    }
  };

  // delete account

  const {
    mutateAsync: mutateDeleteAsync,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
  } = api.users.delete.useMutation();

  const {
    register: registerDelete,
    handleSubmit: handleDeleteAccount,
    setValue: setDeleteValue,
  } = useForm<FormDelete>();

  const onDeleteValid: SubmitHandler<FormDelete> = async ({ id }) => {
    if (!isDeleteSuccess) {
      await mutateDeleteAsync({ id }).then(() => {
        setModalOpen(true);
      });
    }
  };

  useEffect(() => {
    register("id", {
      required: true,
      valueAsNumber: true,
    });
    registerDelete("id", {
      required: true,
      valueAsNumber: true,
    });
  }, [register, registerDelete]);

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setDeleteValue("id", data.id);

      setValue("avatar", ""); // TODO
    }
  }, [setValue, setDeleteValue, data]);

  const onClickCheckbox = () => {
    setChecked(!checked);
  };

  const onModalConfirm = useCallback(() => {
    setModalOpen(false);
    void router.replace("/login");
  }, [router]);

  const modalContent = useMemo(() => {
    return (
      <div className="flex-x-center my-6 mx-4">
        Thank you for using our service.
      </div>
    );
  }, []);

  return (
    <Layout title="Edit Profile" canGoBack hasTabBar>
      <div className="lg:mx-auto lg:w-3/5">
        <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
          <div className="mt-2">
            <span className="text-lg font-semibold text-cyan-500">
              Account Information
            </span>
            <div className="mt-5">
              <span className="text-base font-medium text-gray-700">
                Username
              </span>
              <input
                {...register("name", {
                  setValueAs: (v: string) => (v === "" ? data?.name : v),
                })}
                type="text"
                className="input mt-2"
                placeholder={data?.name || ""}
              />
            </div>
          </div>
          <div className="my-8">
            <span className="text-lg font-semibold text-cyan-500">Profile</span>
            <div className="mt-5">
              <span className="text-base font-medium text-gray-700">
                Profile Image
              </span>
              <div className="mt-4 flex items-center space-x-3">
                <div className="mr-6 h-20 w-20 rounded-full bg-slate-500" />
                <label
                  htmlFor="avatar"
                  className="rounded-md border border-gray-300 py-2 px-4 text-sm font-semibold"
                >
                  Change
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <button className="ring-focus-2 mb-2 w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-600">
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </form>
        <div className="divider" />
        <form onSubmit={handleDeleteAccount(onDeleteValid)}>
          <div className="mt-2 flex flex-col">
            <span className="text-lg font-semibold text-red-600">
              Delete Account
            </span>
            <div className="mt-5 flex flex-col">
              <span className="mb-2 text-sm font-medium leading-5 text-gray-700">
                This is a permanent action and it cannot be undone. After you
                delete your account no one will be able to recover it.
              </span>
              <label htmlFor="deleteAgree">
                <input
                  type="checkbox"
                  name="deleteAgree"
                  id="deleteAgree"
                  className="indeterminate::bg-red-700 appearance-none rounded-sm text-red-700 checked:bg-red-700 focus:ring-red-600"
                  onClick={onClickCheckbox}
                />
                <span className="ml-1 text-sm font-medium leading-5 text-gray-700">
                  I understand this action is permanent and no one will be able
                  to undo it.
                </span>
              </label>
              <button
                className={`my-5 w-full rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${
                  checked
                    ? "ring-focus-2 bg-red-500 hover:bg-red-600 focus:ring-red-500"
                    : "bg-gray-500"
                }`}
                disabled={!checked}
              >
                {isDeleteLoading ? "Loading..." : "Delete Account"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        modalType="Confirm"
        isOpen={modalOpen}
        content={modalContent}
        onConfirm={onModalConfirm}
        confirmText="Confirm"
      />
    </Layout>
  );
};

export default ProfileEdit;
