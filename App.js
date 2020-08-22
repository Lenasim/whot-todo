import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage,
  ClippingRectangle,
} from 'react-native';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { v1 as uuidv1 } from 'uuid';
import Todo from './Todo';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newTodo: '',
    loadedTodos: false,
    todos: {},
  };

  controlNewTodo = (text) => {
    this.setState({
      newTodo: text,
    });
  };

  addTodo = () => {
    if (this.state.newTodo !== '') {
      this.setState((prevState) => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            text: this.state.newTodo,
            isCompleted: false,
            created: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newTodo: '',
          todos: {
            ...prevState.todos,
            ...newTodoObject,
          },
        };
        this.saveTodos(newState.todos);
        return { ...newState };
      });
    }
  };

  completeTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  uncompleteTodo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  updateTodo = (id, newText) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text: newText,
          },
        },
      };
      this.saveTodos(newState.todos);
      return { ...newState };
    });
  };

  deleteTodo = (id) => {
    this.setState((prevState) => {
      delete prevState.todos[id];
      const newState = {
        ...prevState,
        ...this.state.todos,
      };
      return { ...newState };
    });
  };

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(todos);
      this.setState({ loadedTodos: true, todos: parsedTodos });
    } catch (err) {
      console.log(err);
    }
  };

  saveTodos = (newTodos) => {
    //asyncStorage는 object가 아닌 string만 저장할 수 있다. 그러므로 아래 코드는 에러!
    // const _saveTodos = AsyncStorage.setItem('todos', newTodos);
    const _saveTodos = AsyncStorage.setItem('todos', Json.stringify(newTodos));
  };

  componentDidMount() {
    this.loadTodos();
  }

  render() {
    if (!this.state.loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text style={styles.title}>Whot To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'New To Do'}
            placeholderTextColor={'#999'}
            value={this.state.newTodo}
            onChangeText={this.controlNewTodo}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(this.state.todos)
              .reverse()
              .map((t) => (
                <Todo
                  key={t.id}
                  {...t}
                  deleteTodo={this.deleteTodo}
                  completeTodo={this.completeTodo}
                  updateTodo={this.updateTodo}
                  uncompleteTodo={this.uncompleteTodo}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdd835',
    alignItems: 'center',
  },
  title: {
    color: '#999',
    fontSize: 30,
    marginVertical: 30,
    fontWeight: '200',
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //shadow
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOrrset: {
          height: -10,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: {
    alignItems: 'center',
  },
});
