import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";

import { FETCH_FOOD_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

function SingleFood(props) {
    const foodId = props.match.params.foodId;
    const { user } = useContext(AuthContext);
    const {
        data: { getFood }
    } = useQuery(FETCH_FOOD_QUERY, {
        variables: {
            foodId
        }
    });

    function deleteFoodCallback() {
        props.history.push("/foods");
    }

    let foodMarkup;
    if (!getFood) {
        foodMarkup = <p>Loading food...</p>;
    } else {
        const {
            id,
            body,
            displayName,
            createdAt,
            comments,
            commentCount,
            likes,
            likeCount
        } = getFood;

        foodMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            size="small"
                            float="right"
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header as={Link} to={`/foods/${id}`}>
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
                                    food={{ id, likeCount, likes }}
                                />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick="" // comment on food
                                >
                                    <Button color="teal" basic>
                                        <Icon
                                            name="comments"
                                            style={{ margin: 0 }}
                                        />
                                    </Button>
                                    <Label basic color="teal" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.displayName === displayName && (
                                    <DeleteButton
                                        foodId={id}
                                        callback={deleteFoodCallback}
                                    />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return foodMarkup;
}

export default SingleFood;
