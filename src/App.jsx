import React, { useEffect, useState } from "react";
import Posts from "./components/Posts";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const App = () => {
  const postSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    body: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    userId: Yup.string().required("Required"),
  });

  // useEffect(() => {
  //   async function getAddedPost() {
  //     let res = await axios.get(
  //       "https://jsonplaceholder.typicode.com/posts/101"
  //     );
  //     let addedPost = res.data;
  //     setAddedPost(addedPost);
  //   }
  //   getAddedPost();
  // }, []);

  return (
    <>
      <section>
        <div className="container p-10">
          <div className="heading">
            <h1 className="text-3xl">Posts</h1>
          </div>
          <div className="addPosts bg-purple-200 p-10 rounded-md my-5">
            <h3 className="text-3xl mb-4 px-1">Add Post</h3>
            <Formik
              initialValues={{
                title: "",
                body: "",
                userId: "",
              }}
              validationSchema={postSchema}
              onSubmit={(values) => {
                axios
                  .post("https://jsonplaceholder.typicode.com/posts", {
                    title: values.title,
                    body: values.body,
                    userId: values.userId,
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="title"
                    placeholder="Post Title"
                    className="input"
                  />
                  {errors.title && touched.title ? (
                    <div className="error">{errors.title}</div>
                  ) : null}
                  <Field
                    name="body"
                    className="input"
                    placeholder="Post Description"
                  />
                  {errors.body && touched.body ? (
                    <div className="error">{errors.body}</div>
                  ) : null}
                  <Field name="userId" type="number" className="input" />
                  {errors.userId && touched.userId ? (
                    <div className="error">{errors.userId}</div>
                  ) : null}
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <div className="AddedPosts">{}</div>
          </div>
          <Posts />
        </div>
      </section>
    </>
  );
};

export default App;
