import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SesssionContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Error } from "@/components";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { dbService } from "@/supabase/db";
import { Loader2 } from "lucide-react";

export default function CreateLink() {
  const shortLink = import.meta.env.VITE_SHORT_URL;
  const { user } = useSession();
  const navigate = useNavigate();
  const qrRef = useRef();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(dbService.createUrl);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [data, error]);

  const createUrl = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = qrRef.current?.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(
        formValues.title,
        formValues.longUrl,
        user.id,
        formValues.customUrl,
        blob
      );
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-blue-400">Create New Link</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          <QRCode value={formValues?.longUrl} size={250} ref={qrRef} />
        )}
        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
          className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter Long Url"
          value={formValues.longUrl}
          onChange={handleChange}
          className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="px-3 py-2 bg-gray-700 text-gray-100">
            {shortLink}
          </Card>
          <Input
            id="customUrl"
            placeholder="Enter Custom Url (Optional)"
            value={formValues.customUrl}
            onChange={handleChange}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
          />
        </div>
        {error && <Error message={error.message} />}
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            onClick={createUrl}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Creating ...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
