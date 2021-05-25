/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, BrowserRouter as Router, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PanelCenter.scss';
import hinh from '../../assets/images/android-icon-36x36.png';
import { Button } from 'bootstrap';
import ArticleAPI from '../../api/ArticleAPI';
import CommentAPI from '../../api/CommentAPI';
import ReportAPI from '../../api/ReportAPI';
import AuthAPI from '../../api/AuthAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom';



PanelCenter.propTypes = {
    isListYourArticle: PropTypes.number.isRequired,
    onListChange: PropTypes.func,
};


PanelCenter.defaultProps = {
    onListChange: null,
};



function PanelCenter(props) {
    const { isListYourArticle, onListChange } = props;
    const [articleList, setArticleList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const [token, setToken] = useCookies(['access_token']);
    const [userMail, setUsermail] = useCookies(['user_mail']);
    const { register, error, handleSubmit } = useForm();

    const [isCreated, setIsCreated] = useState(0);
    const [isDeleted, setDeleted] = useState(false);
    const [isUpdated, setUpdated] = useState(0);
    const [isLiked, setLiked] = useState(0);


    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [idForupdate, setId] = useState(-1);

    const [contentCmt, setContentCmt] = useState('')
    const [idArticleCmt, setIdArticleCmt] = useState(-1);

    const [idCurrent, setIdcurrent] = useState(-1);

    let history = useHistory()

    const addArticleBtn = data => {

        let form_data = new FormData();
        form_data.append('category', category + 1);
        form_data.append('title', data.title);
        form_data.append('content', content);


        const response = ArticleAPI.create(form_data, token['access_token'])
            .then(resp => {
                console.log(resp);
                setIsCreated(isCreated + 1);
                window.confirm("Successfully!")
                window.location.reload();

            })
            .catch(error => { console.log(error) })


    }

    const deleteArticleBtn = (id) => {

        var answer = window.confirm("Are you sure?")
        if (answer) {
            const response = ArticleAPI.delete(id, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    window.location.reload();
                })
                .catch(error => { console.log(error) })
        } else {
            window.alert("Cancel !!!");
        }

    }


    const loadToEditArticleBtn = (id) => {

        for (var i = 0; i < articleList.length; i++) {
            if (articleList[i]['id'] == id) {
                setCategory(articleList[i]['category']);
                setTitle(articleList[i]['title']);
                setContent(articleList[i]['content']);
                setId(id);
            }
        }

    }
    function editArticle() {


        var answer = window.confirm("Are you sure?")
        if (answer) {
            let form_data = new FormData();
            form_data.append('category', category + 1);
            form_data.append('title', title);
            form_data.append('content', content);

            const response = ArticleAPI.update(form_data, idForupdate, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    window.location.reload();
                })
                .catch(error => { console.log(error) })
        } else {
            window.alert("Cancelled !!!");
        }

        // console.log(id)

    }


    const LikeArticleBtn = (id) => {

        const response = ArticleAPI.like(id, token['access_token'])
            .then(resp => {
                console.log(resp);
                setLiked(isLiked + 1);
            })
            .catch(error => { console.log(error) })

        // console.log(id + "token: " + token['access_token']);
    }



    useEffect(() => {
        if (isListYourArticle === 0) {
            const fetchArticleList = async () => {
                try {
                    const response = ArticleAPI.getAll(token['access_token'])
                        .then(resp => {
                            console.log(resp)
                            setArticleList(resp.data);
                        })

                } catch (error) {
                    console.log("Failed to fetch Article list", error);
                }
            }
            fetchArticleList();
        } else if (isListYourArticle === -1) {
            const fetchArticleList = async () => {
                try {
                    const response = ArticleAPI.getListOfUser(token['access_token'])
                        .then(resp => {
                            console.log(resp)
                            setArticleList(resp.data);
                        })

                } catch (error) {
                    console.log("Failed to fetch Article list", error);
                }
            }
            fetchArticleList();
        } else {
            const fetchArticleList = async () => {
                try {
                    const response = ArticleAPI.getListbyCat(isListYourArticle, token['access_token'])
                        .then(resp => {
                            console.log(resp)
                            setArticleList(resp.data);
                        })

                } catch (error) {
                    console.log("Failed to fetch Article list", error);
                }
            }
            fetchArticleList();
        }
    }, [isCreated, isLiked, isListYourArticle]);



    const get_comment_of_article = (id) => {
        const response = CommentAPI.get_comment_of(id, token['access_token'])
            .then(resp => {
                console.log(resp);
                setCommentList(resp.data)
            })
            .catch(error => { console.log(error) })
        // console.log(id)
    }
    const CRUCommentBtn = data => {
        let form_data = new FormData();
        form_data.append('content_cmt', data.content_comment);
        form_data.append('article_cmt', data.article_id);

        console.log(data.article_id);
        console.log(data.content_comment);

        if (isUpdated != 0) {

            let form_data = new FormData();
            form_data.append('content_cmt', data.content_comment);
            form_data.append('article_cmt', data.article_id);

            const response = CommentAPI.update(form_data, idForupdate, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    setUpdated(isUpdated + 1);
                    const element = () => document.getElementByName('content_comment');
                    element.value = "Enter some thing else...";
                    setContentCmt('');
                })
                .catch(error => { console.log(error) })
            setUpdated(0);
            // console.log("content: " + data.content_comment + "idComment: " + idForupdate + "token: " + token['access_token']);
            // console.log("before: " + isCreated);
            // var a =
            //     setIsCreated(isCreated + 1);
            // console.log("after: " + !isCreated);
        } else {
            const response = CommentAPI.create(form_data, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    // window.location.reload();
                    setIsCreated(isCreated + 1)
                })
                .catch(error => { console.log(error) })
            setIsCreated(isCreated + 1)
            setContentCmt('');

        }


    }

    const getInfotoEditCommentBtn = (id) => {

        for (var i = 0; i < commentList.length; i++) {
            if (commentList[i]['id'] == id) {
                setContentCmt(commentList[i]['content_cmt']);
            }
        }
        // console.log(contentCmt);

        const element = () => document.getElementByName('content_comment');
        element.value = contentCmt;
        setUpdated(isUpdated + 1);
        setId(id);
    }


    const FollowOrUn = (email) => {
        const response = AuthAPI.followOrUn(email, token['access_token'])
            .then(resp => {
                console.log(resp);
                setLiked(isLiked + 1);
            })
            .catch(error => { console.log(error) })
    }


    const DeleteCommentBtn = (id) => {
        const response = CommentAPI.delete(id, token['access_token'])
            .then(resp => {
                console.log(resp);
                setDeleted(true);
            })
            .catch(error => { console.log(error) })
        setDeleted(false);
    }


    useEffect(() => {

        const renderComment = async () => {
            if (idCurrent != -1) {
                const response = CommentAPI.get_comment_of(idCurrent, token['access_token'])
                    .then(resp => {
                        console.log(resp);
                        setCommentList(resp.data)
                    })
                    .catch(error => { console.log(error) })
            }
        }
        renderComment();
    }, [isCreated, isDeleted, isUpdated]);


    const AddReport = (id, type) => {

        var answer = window.confirm("Are you sure?")
        if (answer) {
            let form_data = new FormData();
            form_data.append('article_be_reported', id);
            form_data.append('type_reported', type);


            const response = ReportAPI.create(form_data, token['access_token'])
                .then(resp => {
                    console.log(resp);
                    window.confirm("This report saved! Thank you")
                })
                .catch(error => { console.log(error) })
        } else {
            window.alert("Cancel !!!");
        }

    }


    return (
        <div className="center-panel col-6" >
            <div className="card">
                <div className="card-body">
                    <div className="container">
                        <input autoComplete="off" className="form-control container-fluid" data-toggle="modal" data-target="#myModal" placeholder={"What's on your mind, " + unescape(userMail['user_mail']) + "😊"} name="email" />
                    </div>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit(addArticleBtn)} encType="multipart/form-data">
                            <div className="modal-header">
                                <h4 className="modal-title">Write anything!</h4>
                            </div>


                            <div className="modal-body pt-0">
                                <div>
                                    <div className="form-group">
                                        <label className="col-form-label">What category of your article?</label>
                                        <div>
                                            <select name="category" ref={register} defaultValue={category}
                                                onChange={e => setCategory(e.target.selectedIndex)}
                                            >
                                                <option value="Other">Other</option>
                                                <option value="Event">Event</option>
                                                <option value="Photograps">Photograps</option>
                                                <option value="The cancer">The cancer</option>
                                                <option value="Education">Education</option>
                                                <option value="Food/drink">Food/Drink</option>
                                                <option value="Health">Health</option>
                                                <option value="infomation tech">Infomation Tech</option>
                                                <option value="medical">Medical</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label >Title</label>
                                        <input ref={register} value={title} onChange={e => setTitle(e.target.value)} name="title" type="text" className="form-control" placeholder="Title article(if not: other)" required="required" />
                                    </div>
                                    <CKEditor
                                        ref={register}
                                        editor={ClassicEditor}
                                        data={content}
                                        name="content"
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            // console.log({ event, editor, data });
                                            setContent(data);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-outline-success m-2" style={{ left: "0" }} type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Router>
                {articleList.map(article => {
                    const u_mail = unescape(userMail['user_mail'])
                    return (
                        <div className="card" key={article.id}>
                            <div className="card-header block-quote">
                                <img src={article.user_avatar} className="rounded-circle" alt="" />
                                <h5 className="author-name font-italic lead">{article.author_name}
                                    {article.list_followed.includes(u_mail) ? <a className="btn btn-outline-danger btn-sm ml-3" onClick={() => FollowOrUn(article.author_name)}>Unfollow</a> : <a className="btn btn-outline-primary btn-sm ml-3" onClick={() => FollowOrUn(article.author_name)}>Follow</a>}
                                    <div className="blockquote-footer">{article.create_time}</div>
                                </h5>
                                {u_mail == article.author_name ? <a to="#" className="btn" data-toggle="dropdown"><i className='fa fa-ellipsis-v mr-1'></i></a> : undefined}
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#" onClick={() => loadToEditArticleBtn(article.id)} data-toggle="modal" data-target="#updateArticleModal"  >Edit</a>
                                    <a className="dropdown-item" href="#" onClick={() => deleteArticleBtn(article.id)}>Delete</a>
                                </div>

                                <div className="modal" id="updateArticleModal">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form onSubmit={handleSubmit(editArticle)} encType="multipart/form-data">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Edit your article!</h4>
                                                </div>


                                                <div className="modal-body pt-0">
                                                    <div>

                                                        <div className="form-group">
                                                            <label className="col-form-label">What category of your article?</label>
                                                            <div>
                                                                <select name="category" ref={register} defaultValue={category}
                                                                    onChange={e => setCategory(e.target.selectedIndex)}
                                                                >
                                                                    <option value="Other">Other</option>
                                                                    <option value="Event">Event</option>
                                                                    <option value="Photograps">Photograps</option>
                                                                    <option value="The cancer">The cancer</option>
                                                                    <option value="Education">Education</option>
                                                                    <option value="Food/drink">Food/Drink</option>
                                                                    <option value="Health">Health</option>
                                                                    <option value="infomation tech">Infomation Tech</option>
                                                                    <option value="medical">Medical</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Title</label>
                                                            <input ref={register} value={title} onChange={e => setTitle(e.target.value)} name="title" type="text" className="form-control" placeholder="Title article(if not: other)" required="required" />
                                                        </div>
                                                        <CKEditor
                                                            ref={register}
                                                            editor={ClassicEditor}
                                                            data={content}
                                                            name="content"
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                // console.log({ event, editor, data });
                                                                setContent(data);
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="modal-footer">
                                                    <button className="btn btn-outline-danger m-2" style={{ left: "0" }} type="submit">Edit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <div className="card-text" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                            </div>
                            <div className="card-footer row">
                                <Link to="#" className="btn col-4" onClick={() => LikeArticleBtn(article.id)}>
                                    <i className="fa mr-2" style={{ fontSize: '24px', color: 'red' }}>
                                        {article.users_like}
                                    </i>
                                    <i className='fa fa-heart mr-5 ' style={{ fontSize: '24px', color: 'red' }}>

                                    </i>
                                    {article.list_liked.includes(u_mail) ? 'Dislike' : 'Like'}
                                </Link>
                                <Link to="#" className="btn col-4" data-toggle="collapse" data-target={"#commentform" + article.id}>
                                    <i className='fa fa-comment mr-3' style={{ fontSize: '24px' }}></i>Comment
                                </Link>
                                <div className="dropdown">
                                    <Link to="#" className="btn" data-toggle="dropdown">Report <i className='fa fa-bolt ml-3' style={{ fontSize: '24px' }}></i></Link>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" id="nudity" onClick={() => AddReport(article.id, 1)}  >Nudity</a>
                                        <a className="dropdown-item" id="violence" onClick={() => { AddReport(article.id, 2) }}  >Violence</a>
                                        <a className="dropdown-item" id="spam" onClick={() => { AddReport(article.id, 3) }}  >Spam</a>
                                        <a className="dropdown-item" id="hate-speech" onClick={() => { AddReport(article.id, 4) }}  >Hate Speech</a>
                                        <a className="dropdown-item" id="terrorism" onClick={() => { AddReport(article.id, 5) }}  >Terrorism</a>
                                        <a className="dropdown-item" id="something-else" onClick={() => { AddReport(article.id, 6) }}  >Something Else</a>
                                    </div>
                                </div>

                            </div>
                            <div className="collapse" id={"commentform" + article.id}>

                                <form className="flex-grow-1 d-flex" onSubmit={handleSubmit(CRUCommentBtn)} encType="multipart/form-data">
                                    <textarea ref={register} value={contentCmt} onChange={e => { setContentCmt(e.target.value); setIdArticleCmt(article.id) }} name="content_comment" className="form-control" required="required" placeholder="Enter some thing else..." rows="3"></textarea>
                                    <input ref={register} value={idArticleCmt} onChange={e => e} name="article_id" type="hidden" className="form-control" required="required" />
                                    <button className="btn btn-primary m-3" type="submit">Send</button>
                                </form>

                                <Link to="#" className="btn" data-toggle="collapse" data-target={"#listcomment" + article.id} onClick={() => { get_comment_of_article(article.id); setIdcurrent(article.id); }} >View all comment...</Link>
                            </div>
                            <div className="collapse box-info full" id={"listcomment" + article.id}>
                                <ul className="media-list">
                                    {commentList.map((comment) => {
                                        return (
                                            // <li key={comment.id}>{comment.content_cmt}</li>
                                            <li className="media" key={comment.id}>
                                                <a className="pull-left" href="#fakelink">
                                                    <img className="media-object rounded-circle" src={hinh} alt="Avatar" />
                                                </a>
                                                <div className="media-body">
                                                    <h5 className="media-heading d-flex">
                                                        <a href="#fakelink" className="p-2">{comment.author_name}
                                                        </a>
                                                        <small className="mt-3">
                                                            -{comment.date_create}
                                                        </small>
                                                        <small className="ml-auto">

                                                            {u_mail == comment.author_name ? <a to="#" className="btn" data-toggle="dropdown"><i className='fa fa-ellipsis-v mr-1'></i></a> : undefined}
                                                            <div className="dropdown-menu">
                                                                <a className="dropdown-item" id="editbtn" onClick={() => getInfotoEditCommentBtn(comment.id)}  >Edit</a>
                                                                <a className="dropdown-item" onClick={() => { DeleteCommentBtn(comment.id) }}  >Delete</a>
                                                            </div>
                                                        </small>
                                                    </h5>
                                                    <p>{comment.content_cmt}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                    )
                })}
            </Router>
        </div >
    );
}

export default PanelCenter;

