import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
    food: { body, createdAt, id, displayName, likeCount, commentCount, likes }
}) {
    const { user } = useContext(AuthContext);

    function commentOnFood() {
        console.log("comment on food!");
    }

    return (
        <Card fluid style={{ borderRadius: 0 }}>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                />
                <Card.Header as={Link} to={`/foods/${id}`}>
                    {body}
                </Card.Header>
                <Card.Meta>
                    <Icon name="user outline" style={{ marginRight: 5 }} />
                    {displayName}
                    <br />
                </Card.Meta>
                <Card.Meta>
                    <Icon name="clock outline" style={{ marginRight: 5 }} />
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} food={{ id, likes, likeCount }} />
                <Button labelPosition="right" as={Link} to={`/foods/${id}`}>
                    <Button color="orange" basic>
                        <Icon name="comments" style={{ margin: 0 }} />
                    </Button>
                    <Label basic color="orange" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.displayName === displayName && (
                    <Button
                        as="div"
                        color="red"
                        floated="right"
                        onClick={commentOnFood}
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;
