import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

class Todo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
    todoValue: '',
  };

  toggleComplete = () => {
    this.setState({ isCompleted: !this.state.isCompleted });
  };

  startEditing = () => {
    this.setState({ isEditing: true, todoValue: this.props.text });
  };

  finishEditing = () => {
    this.setState({ isEditing: false });
  };

  controlInput = (text) => {
    this.setState({ todoValue: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.toggleComplete}>
            <View
              style={[
                styles.radio,
                this.state.isCompleted ? styles.completed : styles.uncompleted,
              ]}
            />
          </TouchableOpacity>
          {this.state.isEditing ? (
            <TextInput
              style={[
                styles.input,
                styles.text,
                this.state.isCompleted ? styles.completed : styles.uncompleted,
              ]}
              value={this.state.todoValue}
              multiline={true}
              onChangeText={this.controlInput}
              returnKeyType={'done'}
              //칸 밖을 클릭하면 편집 종료
              onBlur={this.finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                this.state.isCompleted ? styles.completed : styles.uncompleted,
              ]}
            >
              {this.props.text}
            </Text>
          )}
        </View>

        {this.state.isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.finishEditing}>
              <View style={styles.actionContainer}>
                <MaterialIcons name='check' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this.startEditing}>
              <View style={styles.actionContainer}>
                <MaterialIcons name='edit' size={24} color='black' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteTodo(this.props.id)}>
              <View style={styles.actionContainer}>
                <MaterialIcons name='close' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radio: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderColor: '#f9a825',
    borderWidth: 3,
    marginRight: 20,
  },
  completed: {
    borderColor: '#bbb',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompleted: {
    borderColor: '#f9a825',
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 20,
    width: width / 2,
  },
});

export default Todo;
