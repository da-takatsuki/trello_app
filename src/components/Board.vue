<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="newBoard"
          :counter="100"
          label="New Board"
          append-icon="mdi-plus"
          @click="addBoard"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="board in boards" :key="board.id">
        <v-card>
          <v-card-title>
            <v-row no-gutters>
              <v-col class="text-left" cols="11"> {{ board.id }} </v-col>
              <v-col class="text-right" cols="1">
                <v-card-actions>
                  <v-btn icon @click="deleteBoard(board.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-item>
            <v-btn @click:append="addBoard">Add</v-btn>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newBoard: "",
      boards: [],
    };
  },
  methods: {
    addBoard() {
      if (this.newBoard.trim() === "") return;
      this.boards.push({
        id: this.newBoard,
        text: this.newBoard,
      });
      this.newBoard = "";
    },
    deleteBoard(boardId) {
      this.boards = this.boards.filter((board) => board.id !== boardId);
    },
  },
};
</script>
