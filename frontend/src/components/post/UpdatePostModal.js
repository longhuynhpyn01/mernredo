import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { usePost } from "../../contexts/PostContext";
import closeIcon from "../../assets/close-lg.svg";

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = usePost();
  const [updatedPost, setUpdatedPost] = useState(post);
  const { title, description, url, status } = updatedPost;

  // cho trường hợp khi nhấn update vào 1 post thì cập nhật post thì sẽ chạy lại Modal
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    // khi nhấn ra ngoài thì setUpdatePost vẫn là cũ khi nhấn lại
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onHandleUpdateForm = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>Making progress?</Modal.Title>
        <button
          type="button"
          className="post-button opacity-50"
          onClick={closeDialog}
        >
          <img src={closeIcon} alt="close" width="24" height="24" />
        </button>
      </Modal.Header>
      <Form onSubmit={onHandleUpdateForm}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
