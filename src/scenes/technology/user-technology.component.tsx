import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Divider,
  Text,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

import {UsersTechnologyScreenProps} from '../../navigation/todo.navigator';

import {ApplicationState} from '../../store';
import {
  UsersTechnologyTypes,
  UsersTechnology,
  User,
} from '../../store/ducks/users-technology/types';

import {PersonIcon, CodeOutlineIcon} from '../../assets/icons';

import {connect} from 'react-redux';

// Integrando State em Props
const mapStateToProps = ({
  UsersTechnology,
  Authentication,
  Technology,
}: ApplicationState) => ({
  UsersTechnology,
  Authentication,
  Technology,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  usersTechnologyRequest: (token: string) => ({
    type: UsersTechnologyTypes.USERS_TECHNOLOGY_REQUEST,
    payload: token,
  }),
};
/**
 * Redux Action Register Request
 */
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps &
  DispatchProps &
  UsersTechnologyScreenProps &
  ThemedComponentProps;

const UserTechnologyScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {usersTechnology} = props.UsersTechnology;
    const {technologies} = props.Technology;
    const {token} = props.Authentication;

    React.useEffect(() => {
      // Consulta todas as tecnologias
      props.usersTechnologyRequest(token);
    }, [technologies]);

    /**
     * Renderiza cada item da lista de usuário
     * @param item
     */
    const renderUser = ({item}: ListRenderItemInfo<User>): ListItemElement => (
      <ListItem icon={PersonIcon} style={props.themedStyle.item} disabled>
        <Text category="h6">{item.username}</Text>
        <Text appearance="hint" category="s1">
          {item.email}
        </Text>
      </ListItem>
    );

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<UsersTechnology>): ListItemElement => (
      <React.Fragment>
        <ListItem
          icon={CodeOutlineIcon}
          style={props.themedStyle.item}
          disabled>
          <Text category="h6">{item.technology}</Text>
          <Text appearance="hint" category="s1">
            {item.users.length.toString()} Users
          </Text>
          <List
            style={props.themedStyle.list}
            data={item.users}
            renderItem={renderUser}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <Text
          appearance="hint"
          style={[props.themedStyle.title, props.themedStyle.item]}
          category="h5">
          Users x Technology
        </Text>
        <List
          style={props.themedStyle.list}
          data={usersTechnology}
          renderItem={renderTechnology}
        />
      </Layout>
    );
  },
);

export const UserTechnologyScreen = withStyles(
  UserTechnologyScreenComponent,
  theme => ({
    container: {
      flex: 1,
    },
    filterInput: {
      marginTop: 16,
      marginHorizontal: 8,
    },
    list: {
      flex: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
    item: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 12,
      marginHorizontal: 12,
    },
    title: {
      marginTop: 10,
    },
  }),
);
