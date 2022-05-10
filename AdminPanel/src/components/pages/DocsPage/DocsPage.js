import React, { useEffect, useState } from "react";
import "./DocsPage.css";
import { connect } from "react-redux";
import withApiService from "../../HOC";
import { compose } from "../../helpers";
import {
  fetchDocsRequest,
  updateDocsRequest,
} from "../../../redux/actions/docs";
import {
  selectDocs,
  selectDocsIsLoading,
  selectDocsError,
} from "../../../redux/reducers/docs";
import { message, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DocsPage = ({
  apiService,
  docs,
  isLoading,
  error,
  fetchDocsRequest,
  updateDocsRequest,
}) => {
  useEffect(() => {
    if (error) {
      message.error(error);
    }

    fetchDocsRequest({ apiService });
  }, [apiService, error, fetchDocsRequest]);

  const [termsText, setTermsText] = useState(null);

  return (
    <div className="DocsPage">
      <ReactQuill
        value={termsText !== null ? termsText : docs ? docs : ""}
        onChange={(contents) => {
          setTermsText(contents);
        }}
        theme="snow"
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          marginBottom: "20px",
        }}
      />
      <Button
        type="primary"
        onClick={() =>
          updateDocsRequest({
            apiService,
            text: termsText,
            cb: message.success,
          })
        }
      >
        Сохранить
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  docs: selectDocs(state),
  isLoading: selectDocsIsLoading(state),
  error: selectDocsError(state),
});
const mapDispatchToProps = {
  fetchDocsRequest,
  updateDocsRequest,
};

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(DocsPage);
