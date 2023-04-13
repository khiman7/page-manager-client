import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  Button,
  Dialog,
  Divider,
  Paper,
  DialogContentText,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from '@mui/material';
import { MdDeleteOutline, MdLogout, MdOutlineAdd } from 'react-icons/md';
import ReactQuill from 'react-quill';

import { AxiosResponse } from 'axios';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthProvider';
import pagesService from '../../services/pages.service';
import { IPage } from '../../types';

import styles from './Dashboard.module.css';
import 'react-quill/dist/quill.snow.css';

export default function Dashboard() {
  const [pages, setPages] = useState<IPage[]>([]);
  const {
    register,
    setValue,
    setError,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await pagesService.fetchPages();

      setPages(data);
    })();
  }, []);

  useEffect(() => {
    register('content', { required: true, minLength: 12 });
  }, [register]);

  async function onSubmit(data: IPage) {
    try {
      if (['admin', 'login'].includes(data.slug)) {
        setError('slug', { message: 'Slug already in use' });
        return;
      }

      await pagesService.createPage({
        title: data.title,
        description: data.description,
        content: DOMPurify.sanitize(data.content.toString()),
        slug: data.slug,
      });

      setPages((prev) => [...prev, data]);
      reset();
      setOpenModal(false);
    } catch (error: unknown) {
      setError('slug', { message: 'Slug already in use' });
    }
  }

  function onEditorStateChange(editorState: ReactQuill.Value) {
    setValue('content', editorState);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function handleDelete(slug: string) {
    try {
      const response: AxiosResponse = await pagesService.deletePage(slug);

      if (response.status === 204) {
        setPages((prev) => prev.filter((page) => page.slug !== slug));
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return (
    <Paper className="content">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className={styles.dashboard__header}>
        <h1>🔧 Dashboard</h1>
        <h2>Hello, {username}</h2>
        <Button
          variant="contained"
          startIcon={<MdLogout />}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <b>LOGOUT</b>
        </Button>
      </div>
      <Divider />
      <h2 className="subtitle">Available pages:</h2>
      <ul className={styles['page-list']}>
        {pages &&
          pages?.map((page) => (
            <li key={page.slug}>
              <Paper className={styles['page-list__item']}>
                <div>
                  <b>{page.title}</b> /{' '}
                  <Link to={`/${page.slug}`}>{page.slug}</Link>
                </div>
                <Button
                  variant="contained"
                  startIcon={<MdDeleteOutline />}
                  color="error"
                  onClick={() => handleDelete(page.slug)}
                >
                  <b>Delete</b>
                </Button>
              </Paper>
            </li>
          ))}
      </ul>
      <Button
        sx={{
          mt: '32px',
        }}
        variant="contained"
        color="success"
        size="large"
        startIcon={<MdOutlineAdd />}
        onClick={() => setOpenModal(true)}
      >
        <b>Add</b>
      </Button>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          <b>📝 Create a new page</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill all required fields to create a new page
          </DialogContentText>
          <form>
            <TextField
              {...register('title', { required: true, minLength: 3 })}
              fullWidth
              margin="normal"
              label="Title"
              variant="outlined"
            />
            <p className="form__error-message">
              {errors.title && 'Title must be atleast 3 characters long'}
            </p>
            <TextField
              {...register('description', { required: true, minLength: 16 })}
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
            />
            <p className="form__error-message">
              {errors.description &&
                'Description must be atleast 16 characters long'}
            </p>
            <TextField
              {...register('slug', { required: true, minLength: 3 })}
              fullWidth
              margin="normal"
              label="Slug"
              variant="outlined"
            />
            <p className="form__error-message">
              {errors.slug && (errors.slug.message as string)}
            </p>
            <ReactQuill
              className={styles.editor}
              theme="snow"
              placeholder="Compose a page"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ align: ['', 'center', 'right', 'justify'] }],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                  ['link', 'image'],
                ],
              }}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'align',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
              ]}
              value={watch('content')}
              onChange={(event) => onEditorStateChange(event)}
            />
            <p className="form__error-message">
              {errors.content && 'Fill this field'}
            </p>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'flex-start', padding: '0 24px 24px' }}
        >
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(async (data) => onSubmit(data as IPage))}
          >
            Create
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
