import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Button,
    Card,
    Form,
    Grid,
    Icon,
    Image,
    Label,
    Loader,
    Message,
    Segment,
    Transition
} from "semantic-ui-react";

import {
    FETCH_MENU_QUERY,
    CREATE_MENU_COMMENT_MUTATION
} from "../util/graphql";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SingleMenu(props) {
    const menuId = props.match.params.menuId;
    const { user } = useContext(AuthContext);
    const {
        data: { getMenu }
    } = useQuery(FETCH_MENU_QUERY, {
        variables: {
            menuId
        }
    });

    const [comment, setComment] = useState("");

    const [createComment] = useMutation(CREATE_MENU_COMMENT_MUTATION, {
        variables: {
            menuId,
            body: comment
        },
        update() {
            setComment("");
        }
    });

    function deleteMenuCallback() {
        props.history.push("/menus");
    }

    let menuMarkup;
    if (!getMenu) {
        menuMarkup = <Loader active centered="true" />;
    } else {
        const {
            id,
            body,
            displayName,
            email,
            createdAt,
            comments,
            commentCount,
            likes,
            likeCount,
            __typename
        } = getMenu;

        menuMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size="small"
                            float="right"
                            circular
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header as={Link} to={`/menus/${id}`}>
                                    {body}
                                </Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="user outline"
                                        style={{ marginRight: 5 }}
                                    />
                                    {displayName}
                                    <br />
                                </Card.Meta>
                                <Card.Meta>
                                    <Icon
                                        name="clock outline"
                                        style={{ marginRight: 5 }}
                                    />
                                    {moment(createdAt).fromNow(true)}
                                </Card.Meta>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton
                                    user={user}
                                    obj={{ id, likeCount, likes, __typename }}
                                />
                                <Button as="div" labelPosition="right">
                                    <Button color="orange" basic>
                                        <Icon
                                            name="comments"
                                            style={{ margin: 0 }}
                                        />
                                    </Button>
                                    <Label color="orange" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.email === email && (
                                    <DeleteButton
                                        menuId={id}
                                        callback={deleteMenuCallback}
                                    />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Post a comment here..."
                                                name="comment"
                                                value={comment}
                                                onChange={event =>
                                                    setComment(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="ui button olive"
                                                disabled={comment.trim() === ""}
                                                onClick={createComment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        <Segment style={{ overflow: "auto", maxHeight: 500 }}>
                            <h4>Comments</h4>
                            {comments.length > 0 ? (
                                <Transition.Group>
                                    {comments.map(comment => (
                                        <Card fluid key={comment.id}>
                                            <Card.Content>
                                                {user &&
                                                    user.email ===
                                                        comment.email && (
                                                        <DeleteButton
                                                            menuId={id}
                                                            commentId={
                                                                comment.id
                                                            }
                                                            typename={
                                                                __typename
                                                            }
                                                        />
                                                    )}
                                                <Card.Header>
                                                    {comment.displayName}
                                                </Card.Header>
                                                <Card.Meta>
                                                    <Icon
                                                        name="clock outline"
                                                        style={{
                                                            marginRight: 5
                                                        }}
                                                    />
                                                    {moment(
                                                        comment.createdAt
                                                    ).fromNow()}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {comment.body}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Transition.Group>
                            ) : (
                                <Message info floating>
                                    <Message.Header>
                                        There are no available comments.
                                    </Message.Header>
                                    <p>Post a comment now.</p>
                                </Message>
                            )}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return menuMarkup;
}

export default SingleMenu;
