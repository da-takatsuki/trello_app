<template>
  <div class="header text-h4">Trello Replica App</div>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 600px; margin: 12px">
        <v-card-title style="text-align: center"> ボード </v-card-title>
        <v-card-text>
          <v-text-field label="タイトル" v-model="newBoardTilte"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeCreateBoard"> 閉じる </v-btn>
          <v-btn color="blue" variant="flat" @click="createBoard">作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
  <v-container class="bg-surface-variant" style="margin-top: 40px">
    <v-row no-gutters align-content="start">
      <v-col
        v-if="boards.length === 0"
        cols="12"
        class="text-center align-self-center"
      >
        No Board...
      </v-col>
      <v-col v-for="board in boards" :key="board.id" cols="12" sm="4">
        <v-sheet class="ma-2">
          <v-btn
            :disabled="loading"
            :loading="loading"
            class="text-none board"
            @click="pushRouter(board.id)"
            >{{ board.title }}</v-btn
          >
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      newBoardTilte: "",
      boards: [],
    };
  },
  methods: {
    createBoard() {
      if (this.newBoardTilte.trim() === "") return;
      this.boards.push({
        id: uuidv4(),
        title: this.newBoardTilte,
      });
      this.newBoardTilte = "";
    },
    deleteBoard(boardId) {
      this.boards = this.boards.filter((board) => board.id !== boardId);
    },
    pushRouter(path) {
      this.$router.push(`/board/${path}`);
    },
  },
};
</script>

<style>
.header {
  font-size: 24px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
}
.board {
  width: 100%;
  height: 150px !important;
}
</style>
