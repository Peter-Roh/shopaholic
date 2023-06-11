import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import useUser from "@/libs/client/useUser";
import { createHelpers } from "@/libs/server/helpers";
import { withSessionSsr } from "@/libs/server/sessions";
import { api, type RouterInputs } from "@/utils/api";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormValues = RouterInputs["stream"]["ready"];

const StreamCreate: NextPage = () => {
  const { data } = useUser();
  const router = useRouter();
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { mutateAsync, isSuccess } = api.stream.ready.useMutation();

  const onValid: SubmitHandler<FormValues> = async ({
    title,
    description,
    userId,
  }) => {
    if (!isSuccess) {
      await mutateAsync({ title, description, userId }).then(({ id }) => {
        setLoadingModalOpen(false);
        void router.replace(`/live/${id}`);
      });
    }
  };

  const onError = () => {
    setLoadingModalOpen(false);
    toast.error("Could not start streaming...");
  };

  const handleSubmitForm = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setLoadingModalOpen(true);
    return handleSubmit(onValid, onError)(e);
  };

  useEffect(() => {
    register("userId", {
      required: true,
      valueAsNumber: true,
    });
  }, [register]);

  useEffect(() => {
    if (data) {
      setValue("userId", data.id);
    }
  }, [setValue, data]);

  return (
    <Layout title="Create Streaming" hasTabBar canGoBack>
      <div className="lg:mx-auto lg:w-3/5">
        <form onSubmit={handleSubmitForm}>
          {
            // * title
          }
          <div>
            <div>
              <label className="mb-2 block text-base font-medium text-gray-700 dark:text-slate-100">
                Title
              </label>
            </div>
            <div className="mb-4 w-full">
              <input
                {...register("title", {
                  required: true,
                  setValueAs: (v: string) => (v === "" ? null : v),
                })}
                type="text"
                className="ring-focus w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500"
                placeholder="title"
              />
            </div>
          </div>
          {
            // * description
          }
          <div className="mb-4">
            <label className="mb-2 block text-base font-medium text-gray-700 dark:text-slate-100">
              Description
            </label>
            <textarea
              {...register("description", {
                required: true,
                setValueAs: (v: string) => (v === "" ? null : v),
              })}
              className="ring-focus w-full rounded-md border-gray-500 shadow-sm focus:border-cyan-500"
              rows={4}
            />
          </div>

          <button className="ring-focus-2 mb-8 w-full rounded-md border border-transparent bg-cyan-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-600">
            Go Live!
          </button>
        </form>
      </div>
      <Modal modalType="Loading" isOpen={loadingModalOpen} />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async (context: GetServerSidePropsContext) => {
    const { helpers } = await createHelpers(context);

    await helpers.users.me.prefetch(undefined);

    return {
      props: {
        trpcState: helpers.dehydrate(),
      },
    };
  }
);

export default StreamCreate;
