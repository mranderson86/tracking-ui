import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Button,
  CheckBox,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

import {AppRoute} from '../../navigation/app-routes';

import {TodoInProgressScreenProps} from '../../navigation/todo.navigator';

import {ApplicationState} from '../../store';
import {TechnologyTypes, Technology} from '../../store/ducks/technology/types';
import {DoneAllIcon} from '../../assets/icons';

import {connect} from 'react-redux';
import {boolean} from 'yup';

// Integrando State em Props
const mapStateToProps = ({Technology, Authentication}: ApplicationState) => ({
  Technology,
  Authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  technologyRequest: (token: string) => ({
    type: TechnologyTypes.TECHNOLOGY_REQUEST,
    payload: token,
  }),

  technologyChecked: (technology: Technology) => ({
    type: TechnologyTypes.TECHNOLOGY_CHECKED,
    payload: {technology},
  }),

  technologySave: (technologies: Technology[], token: string) => ({
    type: TechnologyTypes.TECHNOLOGY_SAVE,
    payload: {technologies, token},
  }),
};
/**
 * Redux Action Register Request
 */
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps &
  DispatchProps &
  TodoInProgressScreenProps &
  ThemedComponentProps;

const TechnologyScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {technologies} = props.Technology;
    const {token} = props.Authentication;

    React.useEffect(() => {
      // Consulta todas as tecnologias
      props.technologyRequest(token);
    }, []);

    // Renderiza o botão FAB se houver tecnologias marcadas
    const showRenderFab = (): boolean => {
      const selected: [] = technologies.filter(
        (item: Technology) => item.checked,
      );
      return selected.length > 0;
    };

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<Technology>): ListItemElement => (
      <ListItem style={props.themedStyle.item}>
        <CheckBox
          text={item.technology}
          checked={item.checked}
          onChange={checked => props.technologyChecked({...item, checked})}
        />
      </ListItem>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <List
          style={props.themedStyle.list}
          data={technologies}
          renderItem={renderTechnology}
        />
        {showRenderFab() && (
          <Button
            style={props.themedStyle.fab}
            icon={DoneAllIcon}
            onPress={() => props.technologySave(technologies, token)}
          />
        )}
      </Layout>
    );
  },
);

export const TechnologyScreen = withStyles(
  TechnologyScreenComponent,
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
      flexDirection: 'row',
      paddingHorizontal: 12,
      marginHorizontal: 10,
    },
    itemProgressBar: {
      width: '50%',
      marginVertical: 12,
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
      borderRadius: 50,
      width: 70,
      height: 70,
    },
  }),
);