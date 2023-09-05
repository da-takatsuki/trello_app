<template>
  <v-container>
    <v-row justify="center">
      <v-card v-if="isCreateList" style="width: 600px; margin: 12px">
        <v-card-title style="text-align: center"> リスト </v-card-title>
        <v-card-text>
          <v-text-field label="タイトル" v-model="newListTilte"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeCreateList"> 閉じる </v-btn>
          <v-btn color="blue" variant="flat" @click="createList">作成</v-btn>
        </v-card-actions>
      </v-card>
      <v-btn
        :disabled="loading"
        :loading="loading"
        v-else="isCreateList"
        variant="outlined"
        @click="openCreateList"
      >
        リストを作成する
      </v-btn>
    </v-row>
  </v-container>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="List in Lists" :key="n" cols="12" sm="4">
        <div class="ma-2 pa-2">
          <v-card style="width: 100%">
            <div style="background-color: blue">
              <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                <v-toolbar-title class="text-h6">
                  {{ List.title }}
                </v-toolbar-title>
                <template v-slot:append>
                  <v-btn
                    icon="$close"
                    size="large"
                    variant="text"
                    @click="deleteList(List.id)"
                  ></v-btn>
                </template>
              </v-toolbar>
            </div>
            <v-card-text>
              <div class="font-weight-bold ms-1 mb-2">
                <v-text-field
                  v-model="List.newCardTitle"
                  @keyup.enter="addCard(List)"
                ></v-text-field>
              </div>
              <v-list lines="one">
                <div v-for="card in Cards">
                  <div v-if="card.listId === List.id">
                    <v-card class="ma-2 pa-4">
                      <v-row no-gutters align="center">
                        <v-col
                          cols="11"
                          class="text-left"
                          style="font-size: large"
                          >{{ card.title }}</v-col
                        >
                        <v-col cols="1" class="text-right">
                          <v-btn
                            variant="text"
                            icon
                            @click="deleteCard(card.id)"
                          >
                            <v-icon style="color: red">mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </div>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      newListTilte: "",
      Lists: [
        { id: "1", title: "todo", newCardTitle: "" },
        { id: "2", title: "doing", newCardTitle: "" },
      ],
      Cards: [
        { id: "1", listId: "1", title: "aaa" },
        { id: "2", listId: "1", title: "bbb" },
        { id: "3", listId: "2", title: "ccc" },
      ],
      isCreateList: false,
      items: [
        { no: 1, name: "キャベツ", categoryNo: "1" },
        { no: 2, name: "ステーキ", categoryNo: "2" },
        { no: 3, name: "リンゴ", categoryNo: "3" },
      ],
    };
  },
  components: {
    draggable: draggable,
  },
  methods: {
    openCreateList() {
      this.isCreateList = true;
    },
    closeCreateList() {
      this.isCreateList = false;
    },
    createList() {
      if (this.newListTilte.trim() === "") return;
      this.Lists.push({
        id: this.newListTilte,
        title: this.newListTilte,
      });
      this.newListTilte = "";
      this.isCreateList = false;
    },
    deleteList(ListId) {
      this.Lists = this.Lists.filter((List) => List.id !== ListId);
    },
    pushRouter(path) {
      this.$router.push(`/List/${path}`);
    },
    addCard(list) {
      if (!list.newCardTitle.trim()) return;
      this.Cards.push({
        id: uuidv4(),
        listId: list.id,
        title: list.newCardTitle,
      });
      list.newCardTitle = ""; // 入力フィールドをクリア
    },
    deleteCard(cardId) {
      this.Cards = this.Cards.filter((Card) => Card.id !== cardId);
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
.List {
  width: 100%;
  height: 150px !important;
}
</style>
