import React from "react";
import {Editor} from "@tinymce/tinymce-react"
   //Editor is React component
import {Controller} from "react-hook-form"
  /*
    Q> What is Controller?

    1. Controller is a higher-order component (HOC) provided by react-hook-form.

    2. It acts as a bridge between controlled components (like Material-UI, Ant Design, or TinyMCE) and React Hook Form.

    3. It allows you to integrate third-party components that do not follow React Hook Form's uncontrolled component pattern.
  */

export default function RTE({
    name,
    control,
    label,
    defaultValue =""
}) {
    return (

        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1"> {label} </label>}

        <Controller
        name= {name || "content"}
        control={control}

        render={({field: {onChange}}) => (
            <Editor
            apiKey='8ub6sdprz3c69r00kx0sbj01i415jptjkf1ib1svgu0cptfj'
            //Editor is React component
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            //TenyMce provides an event handler

            /*

            -> onEditorChange comes from TinyMCE.

            -> onChange comes from react-hook-form.

            -> By setting onEditorChange={onChange}, we connect TinyMCE's updates to react-hook-form.

        ❌ What Happens If We Remove onEditorChange?
            
            * If we do not include onEditorChange={onChange}, the user can still edit the text, but react-hook-form will not capture those changes.

            * This means the submitted data will be empty or incorrect.

            */

            />
    )}
        />
        </div>
    )
}